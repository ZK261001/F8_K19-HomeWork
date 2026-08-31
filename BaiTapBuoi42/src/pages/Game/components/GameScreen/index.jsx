import LifelinesBar from "./components/LifelinesBar";
import QuestionBox from "./components/QuestionBox";
import OptionsGrid from "./components/OptionsGrid";
import MoneyLadder from "./components/MoneyLadder";
import styles from "./GameScreen.module.css";

function GameScreen({
    currentLevel,
    question,
    usedLifelines,
    isProcessingAnswer,
    optionStatus,
    hiddenOptionIndices,
    onUseLifeline,
    onSelectAnswer,
}) {
    if (!question) return null;

    return (
        <div className={styles.layout}>
            <div className={styles.left}>
                <LifelinesBar
                    usedLifelines={usedLifelines}
                    isProcessingAnswer={isProcessingAnswer}
                    onUseLifeline={onUseLifeline}
                />
                <QuestionBox
                    levelNumber={currentLevel + 1}
                    questionText={question.question}
                />
                <OptionsGrid
                    answers={question.answers}
                    optionStatus={optionStatus}
                    hiddenOptionIndices={hiddenOptionIndices}
                    isProcessingAnswer={isProcessingAnswer}
                    onSelect={onSelectAnswer}
                />
            </div>

            <MoneyLadder currentLevel={currentLevel} />
        </div>
    );
}

export default GameScreen;
