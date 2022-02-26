import { Contributor } from "./contributor";

export type SkillRecord = Record<string, number>;

export type SkillTupple = [string, number];

export type SkillPlusContributor = {
  skill: SkillTupple;
  contributor: Contributor;
};
