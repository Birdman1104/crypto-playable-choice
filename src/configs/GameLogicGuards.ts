import Head from '../models/HeadModel';

export const isRightChoiceGuard = (choiceName: string): boolean => {
    return Head.gameModel?.board?.isRightChoice(choiceName) || false;
};

export const isWrongChoiceGuard = (choiceName: string): boolean => {
    return !Head.gameModel?.board?.isRightChoice(choiceName) || false;
};
