export const AdModelEvents = {
    StatusUpdate: 'AdModelStatusUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    HintUpdate: 'AdModelHintUpdate',
};

export const BoardModelEvents = { GameOverUpdate: 'BoardModelGameOverUpdate', WavesUpdate: 'BoardModelWavesUpdate' };

export const CtaModelEvents = { VisibleUpdate: 'CtaModelVisibleUpdate' };

export const GameModelEvents = {
    StateUpdate: 'GameModelStateUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate', AdUpdate: 'HeadModelAdUpdate' };

export const HintModelEvents = { StateUpdate: 'HintModelStateUpdate', VisibleUpdate: 'HintModelVisibleUpdate' };

export const SoundModelEvents = { StateUpdate: 'SoundModelStateUpdate' };

export const WaveModelEvents = {
    WaveLevelUpdate: 'WaveModelWaveLevelUpdate',
    RightAnswerUpdate: 'WaveModelRightAnswerUpdate',
    WrongAnswerUpdate: 'WaveModelWrongAnswerUpdate',
};
