import React from 'react';
import SettingsList from './settings-list';
import {
  usePreference,
  featureFlags,
} from 'compass-preferences-model/provider';

const featureFlagFields = Object.keys(
  featureFlags
) as (keyof typeof featureFlags)[];

const previewFeatureFlagFields = featureFlagFields.filter(
  (k: keyof typeof featureFlags) => featureFlags[k].stage === 'preview'
);

const developmentFeatureFlagFields = featureFlagFields.filter(
  (k: keyof typeof featureFlags) => featureFlags[k].stage === 'development'
);

function useShouldShowDevFeatures(): boolean {
  const showDevFeatureFlags = usePreference('showDevFeatureFlags') ?? false;

  return showDevFeatureFlags && developmentFeatureFlagFields.length > 0;
}

function useShouldShowPreviewFeatures(): boolean {
  return previewFeatureFlagFields.length > 0;
}

export function useShouldShowFeaturePreviewSettings(): boolean {
  // We want show the feature preview settings tab if:
  // - there are feature flags in preview stage
  // - or if:
  //   - we are in a development environment or 'showDevFeatureFlags' is explicitly enabled
  //   - and there are feature flags in 'development' stage.
  const showDevFeatures = useShouldShowDevFeatures();
  const showPreviewFeatures = useShouldShowPreviewFeatures();

  return showPreviewFeatures || showDevFeatures;
}

export const FeaturePreviewSettings: React.FunctionComponent = () => {
  const showPreviewFeatures = useShouldShowPreviewFeatures();
  const showDevFeatures = useShouldShowDevFeatures();

  return (
    <div data-testid="feature-flag-settings">
      <div>
        These settings control experimental behavior of Compass. Use them at
        your own risk!
      </div>
      <div>
        {showPreviewFeatures && (
          <SettingsList fields={previewFeatureFlagFields} />
        )}
        {showDevFeatures && (
          <SettingsList fields={developmentFeatureFlagFields} />
        )}
      </div>
    </div>
  );
};

export default FeaturePreviewSettings;
