import { useEffect, useRef, useState } from "react";
import { QUESTION_DATABASE } from "../data/questions.js";
import { PRIZE_LADDER } from "../data/prizeLadder.js";
import { popBackupQuestion } from "../utils/backupQuestionsPool.js";
import { initAudio, playSound } from "../utils/sound.js";
import {
    OPTION_LETTERS,
    TIMER_DURATION_SECONDS,
    TICK_SOUND_THRESHOLD,
    CONFIRM_ANSWER_SUSPENSE_MS,
    CORRECT_ADVANCE_DELAY_MS,
    WRONG_RESULT_DELAY_MS,
    TIMEOUT_RESULT_DELAY_MS,
} from "../utils/constants.js";

const INITIAL_LIFELINES = {
    5050: false,
    phone: false,
    audience: false,
    switch: false,
};

export function useMillionaireGame() {
    const [screen, setScreen] = useState("start"); // "start" | "playing"
    const [currentLevel, setCurrentLevel] = useState(0);
    const [activeQuestions, setActiveQuestions] = useState([]);

    const [usedLifelines, setUsedLifelines] = useState(INITIAL_LIFELINES);
    const [hiddenOptionIndices, setHiddenOptionIndices] = useState([]);

    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION_SECONDS);
    const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [revealedCorrectIndex, setRevealedCorrectIndex] = useState(null);
    const [wrongOptionIndex, setWrongOptionIndex] = useState(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);
    const [phoneDialogue, setPhoneDialogue] = useState("");
    const [isAudienceOpen, setIsAudienceOpen] = useState(false);
    const [audiencePercents, setAudiencePercents] = useState(null);
    const [isWalkAwayOpen, setIsWalkAwayOpen] = useState(false);
    const [gameOverResult, setGameOverResult] = useState(null);

    const timerIntervalRef = useRef(null);
    const pendingTimeoutRef = useRef(null);
    const currentLevelRef = useRef(0);
    const activeQuestionsRef = useRef([]);
    const isProcessingAnswerRef = useRef(false);

    useEffect(() => {
        currentLevelRef.current = currentLevel;
    }, [currentLevel]);
    useEffect(() => {
        activeQuestionsRef.current = activeQuestions;
    }, [activeQuestions]);
    useEffect(() => {
        isProcessingAnswerRef.current = isProcessingAnswer;
    }, [isProcessingAnswer]);

    useEffect(() => {
        return () => {
            clearInterval(timerIntervalRef.current);
            clearTimeout(pendingTimeoutRef.current);
        };
    }, []);

    function clearTimer() {
        clearInterval(timerIntervalRef.current);
    }

    function handleTimeOut() {
        clearTimer();
        setIsProcessingAnswer(true);
        playSound("wrong");

        const qData = activeQuestionsRef.current[currentLevelRef.current];
        setRevealedCorrectIndex(qData.correct);

        pendingTimeoutRef.current = setTimeout(() => {
            finishGame(false, true);
        }, TIMEOUT_RESULT_DELAY_MS);
    }

    function startTimer() {
        clearTimer();
        setTimeLeft(TIMER_DURATION_SECONDS);
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                const next = prev - 1;
                if (next <= TICK_SOUND_THRESHOLD && next > 0) {
                    playSound("tick");
                }
                if (next <= 0) {
                    clearTimer();
                    handleTimeOut();
                    return 0;
                }
                return next;
            });
        }, 1000);
    }

    function resumeTimer() {
        clearTimer();
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearTimer();
                    handleTimeOut();
                    return 0;
                }
                return next;
            });
        }, 1000);
    }

    function loadQuestion(level) {
        setIsProcessingAnswer(false);
        setSelectedOptionIndex(null);
        setRevealedCorrectIndex(null);
        setWrongOptionIndex(null);
        setHiddenOptionIndices([]);
        setCurrentLevel(level);
        currentLevelRef.current = level;
        startTimer();
    }

    function startGame() {
        initAudio();
        const freshQuestions = JSON.parse(JSON.stringify(QUESTION_DATABASE));
        setUsedLifelines(INITIAL_LIFELINES);
        setActiveQuestions(freshQuestions);
        activeQuestionsRef.current = freshQuestions;
        setGameOverResult(null);
        setScreen("playing");
        loadQuestion(0);
    }

    function selectAnswer(index) {
        if (isProcessingAnswer) return;
        initAudio();
        playSound("select");
        setSelectedOptionIndex(index);
        setIsConfirmOpen(true);
    }

    function cancelAnswerSelection() {
        setSelectedOptionIndex(null);
        setIsConfirmOpen(false);
    }

    function confirmFinalAnswer() {
        setIsConfirmOpen(false);
        clearTimer();
        setIsProcessingAnswer(true);

        const level = currentLevelRef.current;
        const pickedIndex = selectedOptionIndex;
        const qData = activeQuestionsRef.current[level];
        const isCorrect = pickedIndex === qData.correct;

        pendingTimeoutRef.current = setTimeout(() => {
            if (isCorrect) {
                playSound("correct");
                setRevealedCorrectIndex(pickedIndex);

                pendingTimeoutRef.current = setTimeout(() => {
                    if (level === 14) {
                        finishGame(true, false);
                    } else {
                        loadQuestion(level + 1);
                    }
                }, CORRECT_ADVANCE_DELAY_MS);
            } else {
                playSound("wrong");
                setWrongOptionIndex(pickedIndex);
                setRevealedCorrectIndex(qData.correct);

                pendingTimeoutRef.current = setTimeout(() => {
                    finishGame(false, false);
                }, WRONG_RESULT_DELAY_MS);
            }
        }, CONFIRM_ANSWER_SUSPENSE_MS);
    }

    function finishGame(isWinner, isTimeout) {
        clearTimer();
        const level = currentLevelRef.current;

        if (isWinner) {
            setGameOverResult({
                title: "XUẤT SẮC! BẠN LÀ TRIỆU PHÚ!",
                description:
                    "Chúc mừng bạn đã chinh phục thành công tất cả 15 câu hỏi!",
                prizeText: PRIZE_LADDER[14] + " VNĐ",
                status: "win",
            });
            return;
        }

        let prize = "0";
        if (level >= 10) {
            prize = PRIZE_LADDER[9];
        } else if (level >= 5) {
            prize = PRIZE_LADDER[4];
        }

        const description = isTimeout
            ? "Đã hết thời gian suy nghĩ cho câu hỏi này!"
            : "Rất tiếc! Đáp án của bạn chưa chính xác.";

        setGameOverResult({
            title: "KẾT THÚC CUỘC CHƠI",
            description,
            prizeText: prize + " VNĐ",
            status: "lose",
        });
    }

    function useLifeline(type) {
        if (usedLifelines[type] || isProcessingAnswer) return;
        initAudio();
        playSound("lifeline");
        setUsedLifelines((prev) => ({ ...prev, [type]: true }));

        const level = currentLevelRef.current;
        const qData = activeQuestionsRef.current[level];

        if (type === "5050") {
            const wrongIndices = [0, 1, 2, 3].filter((i) => i !== qData.correct);
            wrongIndices.sort(() => Math.random() - 0.5);
            setHiddenOptionIndices([wrongIndices[0], wrongIndices[1]]);
        } else if (type === "phone") {
            const correctLetter = OPTION_LETTERS[qData.correct];
            const dialogues = [
                `"Theo mình tìm hiểu thì đáp án chính xác chắc chắn là phương án ${correctLetter}."`,
                `"Chủ đề này mình đã đọc qua rồi, bạn hãy chọn phương án ${correctLetter} nhé!"`,
                `"Thực sự câu này hơi khó, nhưng mình nghiêng 80% về đáp án ${correctLetter}."`,
            ];
            const randomDialogue =
                dialogues[Math.floor(Math.random() * dialogues.length)];
            setPhoneDialogue(randomDialogue);
            setIsPhoneOpen(true);
        } else if (type === "audience") {
            const percentCorrect = Math.floor(Math.random() * 30) + 55;
            let remaining = 100 - percentCorrect;

            const p = [0, 0, 0, 0];
            p[qData.correct] = percentCorrect;

            const otherIndices = [0, 1, 2, 3].filter((i) => i !== qData.correct);

            const p1 = Math.floor(Math.random() * remaining);
            remaining -= p1;
            const p2 = Math.floor(Math.random() * remaining);
            const p3 = remaining - p2;

            p[otherIndices[0]] = p1;
            p[otherIndices[1]] = p2;
            p[otherIndices[2]] = p3;

            setAudiencePercents(p);
            setIsAudienceOpen(true);
        } else if (type === "switch") {
            const newQ = popBackupQuestion();
            if (newQ) {
                const next = [...activeQuestionsRef.current];
                next[level] = newQ;
                setActiveQuestions(next);
                activeQuestionsRef.current = next;
                loadQuestion(level);
            }
        }
    }

    function closePhoneModal() {
        setIsPhoneOpen(false);
    }

    function closeAudienceModal() {
        setIsAudienceOpen(false);
    }

    function openWalkAwayModal() {
        if (isProcessingAnswer) return;
        clearTimer();
        setIsWalkAwayOpen(true);
    }

    function closeWalkAwayModal() {
        setIsWalkAwayOpen(false);
        if (!isProcessingAnswerRef.current) {
            resumeTimer();
        }
    }

    function executeWalkAway() {
        setIsWalkAwayOpen(false);
        clearTimer();
        const level = currentLevelRef.current;
        const prize = level > 0 ? PRIZE_LADDER[level - 1] : "0";
        setGameOverResult({
            title: "DỪNG CUỘC CHƠI",
            description: `Bạn đã quyết định dừng cuộc chơi tại Câu số ${level + 1}.`,
            prizeText: prize + " VNĐ",
            status: "walkaway",
        });
    }

    function restartGame() {
        clearTimer();
        clearTimeout(pendingTimeoutRef.current);
        setGameOverResult(null);
        setScreen("start");
    }

    function optionStatus(index) {
        if (index === wrongOptionIndex) return "wrong";
        if (index === revealedCorrectIndex) return "correct";
        if (index === selectedOptionIndex) return "selected";
        return "default";
    }

    return {
        screen,
        currentLevel,
        activeQuestions,
        usedLifelines,
        hiddenOptionIndices,
        timeLeft,
        isProcessingAnswer,
        optionStatus,
        isConfirmOpen,
        isPhoneOpen,
        phoneDialogue,
        isAudienceOpen,
        audiencePercents,
        isWalkAwayOpen,
        gameOverResult,
        startGame,
        selectAnswer,
        cancelAnswerSelection,
        confirmFinalAnswer,
        useLifeline,
        closePhoneModal,
        closeAudienceModal,
        openWalkAwayModal,
        closeWalkAwayModal,
        executeWalkAway,
        restartGame,
    };
}
