import UseCaseList from './use-case-list';
import SortUseCase from './sort/sort';

export type StageWizardUseCase = {
  id: string;
  title: string;
  stageOperator: string;
  wizardComponent: React.FunctionComponent<{
    onChange: (value: string, validationError: Error | null) => void;
  }>;
  serverVersion?: string;
};

export const STAGE_WIZARD_USE_CASES: StageWizardUseCase[] = [
  {
    id: 'sort',
    title:
      'Sort documents in [ascending/descending] order based on a single or a set of fields.',
    stageOperator: '$sort',
    wizardComponent: SortUseCase,
  },
];

export { UseCaseList };