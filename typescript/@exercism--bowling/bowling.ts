const GAME_PINS = 10;
const GAME_FRAMES = 10;

export default class Bowling {
  private rolls: number[];
  private frames: number[][];
  private currentFrame: number;

  constructor(rolls: number[] = []) {
    this.rolls = [];
    this.frames = [[]];
    this.currentFrame = 0;
    rolls.forEach((roll) => this.roll(roll));
  }

  isFinished(): boolean {
    return this.currentFrame === GAME_FRAMES;
  }

  getCurrentFrame(): number[] {
    return this.frames[this.currentFrame];
  }

  private getFramePins(frame: number[]): number {
    return frame.reduce((acc, val) => acc + val, 0);
  }

  private nextFrame() {
    this.currentFrame += 1;
    if (!this.isFinished()) {
      this.frames.push([]);
    }
  }

  private frameIsStrike(frame: number[]): boolean {
    return frame[0] === GAME_PINS;
  }

  private frameIsSpare(frame: number[]): boolean {
    return (frame[0] || 0) + (frame[1] || 0) >= GAME_PINS;
  }

  isPlayingFillBall(): boolean {
    if (this.currentFrame === GAME_FRAMES - 1) {
      const frame = this.getCurrentFrame();
      return frame.length < 3 && (this.frameIsStrike(frame) || this.frameIsSpare(frame));
    }
    return false;
  }

  private hasPinsOnLane(frame: number[]): boolean {
    let result = true;
    let lanePins = GAME_PINS;
    frame.forEach((roll) => {
      lanePins -= roll;
      if (lanePins < 0) {
        result = false;
        return;
      }
      if (lanePins === 0) {
        lanePins = GAME_PINS;
      }
    });
    return result;
  }

  roll(pins: number) {
    if (pins < 0 || pins > GAME_PINS) {
      throw new Error('Pins must have a value from 0 to 10');
    }
    if (this.isFinished()) {
      throw new Error('Should not be able to roll after game is over');
    }
    const frame = this.getCurrentFrame();
    this.rolls.push(pins);
    frame.push(pins);

    if (!this.hasPinsOnLane(frame)) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    if (!this.isPlayingFillBall() && (this.getFramePins(frame) >= GAME_PINS || frame.length >= 2)) {
      this.nextFrame();
    }
  }

  score(): number {
    if (!this.isFinished()) {
      throw new Error('Score cannot be taken until the end of the game');
    }
    let result = 0;
    let rollCounter = 0;
    this.frames.forEach((frame) => {
      if (this.frameIsStrike(frame)) {
        result += GAME_PINS + (this.rolls[rollCounter + 1] || 0) + (this.rolls[rollCounter + 2] || 0);
      } else if (this.frameIsSpare(frame)) {
        result += GAME_PINS + this.rolls[rollCounter + 2] || 0;
      } else {
        result += this.getFramePins(frame);
      }
      rollCounter += frame.length;
    });
    return result;
  }
}
