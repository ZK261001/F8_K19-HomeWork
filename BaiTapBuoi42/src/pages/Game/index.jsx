import { useMillionaireGame } from "../../hooks/useMillionaireGame.js";
import { PRIZE_LADDER } from "../../data/prizeLadder.js";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ConfirmModal from "./components/modals/ConfirmModal";
import PhoneModal from "./components/modals/PhoneModal";
import AudienceModal from "./components/modals/AudienceModal";
import WalkAwayModal from "./components/modals/WalkAwayModal";
import GameOverModal from "./components/modals/GameOverModal";
import styles from "./Game.module.css";

function Game() {
    const game = useMillionaireGame();
    const question = game.activeQuestions[game.currentLevel];

    const safeAmountText =
        (game.currentLevel > 0 ? PRIZE_LADDER[game.currentLevel - 1] : "0") + " VNĐ";

    return (
        <div className={styles.page}>
            <Header
                screen={game.screen}
                timeLeft={game.timeLeft}
                onWalkAway={game.openWalkAwayModal}
            />

            <main className={styles.main}>
                {game.screen === "start" ? (
                    <StartScreen onStart={game.startGame} />
                ) : (
                    <GameScreen
                        currentLevel={game.currentLevel}
                        question={question}
                        usedLifelines={game.usedLifelines}
                        isProcessingAnswer={game.isProcessingAnswer}
                        optionStatus={game.optionStatus}
                        hiddenOptionIndices={game.hiddenOptionIndices}
                        onUseLifeline={game.useLifeline}
                        onSelectAnswer={game.selectAnswer}
                    />
                )}
            </main>

            <ConfirmModal
                isOpen={game.isConfirmOpen}
                onCancel={game.cancelAnswerSelection}
                onConfirm={game.confirmFinalAnswer}
            />
            <PhoneModal
                isOpen={game.isPhoneOpen}
                dialogue={game.phoneDialogue}
                onClose={game.closePhoneModal}
            />
            <AudienceModal
                isOpen={game.isAudienceOpen}
                percents={game.audiencePercents}
                onClose={game.closeAudienceModal}
            />
            <WalkAwayModal
                isOpen={game.isWalkAwayOpen}
                safeAmountText={safeAmountText}
                onCancel={game.closeWalkAwayModal}
                onConfirm={game.executeWalkAway}
            />
            <GameOverModal result={game.gameOverResult} onRestart={game.restartGame} />

            <footer className={styles.footer}>
                Game Ai Là Triệu Phú • Thiết kế chuẩn truyền hình • 2026
            </footer>
        </div>
    );
}

export default Game;
