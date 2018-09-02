import { TANChallengeArgument } from "./tan-challenge-argument";

export abstract class TANChallenge {
    public abstract version: number;
    public abstract args: TANChallengeArgument[];
}
