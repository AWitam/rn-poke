import { Ability, AbilityRawResponse } from './types';

export const mapRawAbilityToAbility = (rawAbility: AbilityRawResponse): Ability => {
  return {
    name: rawAbility.names.find((name) => name.language.name === 'en')?.name || '',
    effect: rawAbility.effect_entries.find((effect) => effect.language.name === 'en')?.effect || '',
  };
};
