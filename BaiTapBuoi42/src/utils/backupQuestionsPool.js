import { BACKUP_QUESTIONS } from "../data/questions.js";

// Module-level pool: pops permanently and is never refilled by startGame(),
// matching the original game.html behaviour where BACKUP_QUESTIONS is a
// top-level array that drains across the whole browser session.
let pool = [...BACKUP_QUESTIONS];

export function popBackupQuestion() {
    return pool.pop();
}
