import React, { useMemo } from 'react';
import {
  EmptyContent, palette, withTheme
} from '@mongodb-js/compass-components';

type ZeroGraphicProps = {
  darkMode?: boolean;
};

const UnthemedZeroGraphic: React.FunctionComponent<
  ZeroGraphicProps
> = ({ darkMode }) => {
  const fillColor = useMemo(
    () => (darkMode ? palette.white : palette.black),
    [darkMode]
  );

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M46 35V31C46 29.8889 46.8224 29 47.8505 29H66.1495C67.1776 29 68 29.8889 68 31V35C68 36.1111 67.1776 37 66.1495 37H47.7477C46.8224 36.8889 46 36 46 35Z" fill={palette.green.base} />
      <path d="M46 49V45C46 43.8889 46.8224 43 47.8505 43H66.1495C67.1776 43 68 43.8889 68 45V49C68 50.1111 67.1776 51 66.1495 51H47.7477C46.8224 51 46 50.1111 46 49Z" fill={palette.green.base} />
      <path d="M4 28V24C4 22.8889 4.82243 22 5.85047 22H24.1495C25.1776 22 26 22.8889 26 24V28C26 29.1111 25.1776 30 24.1495 30H5.85047C4.82243 29.8889 4 29 4 28Z" fill={palette.green.base} />
      <path d="M4 42V38C4 36.8889 4.82243 36 5.85047 36H24.1495C25.1776 36 26 36.8889 26 38V42C26 43.1111 25.1776 44 24.1495 44H5.85047C4.82243 44 4 43.1111 4 42Z" fill={palette.green.base} />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.94524 8.5H4V7.5H24.9672V8.5H22.0219V21.5H24.1495C25.4896 21.5 26.5 22.65 26.5 24V28C26.5 29.35 25.4896 30.5 24.1495 30.5H22.0219V35.5H24.1495C25.4896 35.5 26.5 36.65 26.5 38V42C26.5 43.35 25.4896 44.5 24.1495 44.5H22.0219V46.5123C22.0219 48.1019 23.3721 49.4509 24.9672 49.4509C25.7947 49.4509 26.467 49.1286 27.0882 48.6012C27.5767 48.1063 27.9125 47.3557 27.9125 46.5123V42.9754L27.9125 42.9719L28.011 29.0246V25.4877C28.011 15.5826 36.1108 7.5 46.0329 7.5C50.997 7.5 55.4502 9.52322 58.7838 12.7495L58.7893 12.7548L58.7946 12.7603C62.0283 16.0886 64.0548 20.6321 64.0548 25.4877V28.5H66.1495C67.4896 28.5 68.5 29.65 68.5 31V35C68.5 36.35 67.4896 37.5 66.1495 37.5H64.0548V42.5H66.1495C67.4896 42.5 68.5 43.65 68.5 45V49C68.5 50.35 67.4896 51.5 66.1495 51.5H64.0548V63.4016H67V64.4016H49.3919L49.3797 64.4018L49.3676 64.4016H46.0328V63.4016H48.8797V51.5H47.7477C46.4929 51.5 45.5 50.3307 45.5 49V45C45.5 43.65 46.5104 42.5 47.8505 42.5H48.8797V37.5H47.7178L47.688 37.4964C46.5128 37.3553 45.5 36.2544 45.5 35V31C45.5 29.65 46.5104 28.5 47.8505 28.5H48.8797V25.586C48.8797 23.9964 47.5295 22.6474 45.9344 22.6474C45.0884 22.6474 44.3359 22.9829 43.84 23.4705C43.3116 24.0904 42.9891 24.761 42.9891 25.586V46.5123C42.9891 56.4174 34.8893 64.5 24.9672 64.5C15.045 64.5 6.94524 56.4174 6.94524 46.5123V44.5H5.85047C4.51041 44.5 3.5 43.35 3.5 42V38C3.5 36.65 4.51041 35.5 5.85047 35.5H6.94524V30.5H5.82353L5.79674 30.4971C4.52832 30.36 3.5 29.2687 3.5 28V24C3.5 22.65 4.51041 21.5 5.85047 21.5H6.94524V8.5ZM7.94524 35.5H21.0219V30.5H7.94524V35.5ZM7.94524 44.5V46.5123C7.94524 55.8633 15.5955 63.5 24.9672 63.5C34.3388 63.5 41.9891 55.8633 41.9891 46.5123V25.586C41.9891 24.4526 42.4489 23.5554 43.0941 22.8041C43.0967 22.8011 43.0993 22.7982 43.1019 22.7953C43.1048 22.7921 43.1077 22.7889 43.1106 22.7858L43.1202 22.7759C43.8058 22.0917 44.8192 21.6474 45.9344 21.6474C48.0799 21.6474 49.8797 23.4422 49.8797 25.586V28.5H63.0548V25.4877C63.0548 20.9144 61.146 16.6182 58.0828 13.4627C54.9201 10.4044 50.713 8.5 46.0329 8.5C36.6612 8.5 29.011 16.1367 29.011 25.4877V29.0246L29.0109 29.0281L28.9125 42.9754V46.5123C28.9125 47.6261 28.4669 48.6381 27.7814 49.3223L27.7678 49.3359L27.7532 49.3484C27.0003 49.9924 26.1018 50.4509 24.9672 50.4509C22.8217 50.4509 21.0219 48.656 21.0219 46.5123V44.5H7.94524ZM21.0219 8.5V21.5H7.94524V8.5H21.0219ZM49.8797 37.5H63.0548V42.5H49.8797V37.5ZM49.8797 51.5H63.0548V63.4016H49.8797V51.5ZM4.5 24C4.5 23.1277 5.13445 22.5 5.85047 22.5H24.1495C24.8656 22.5 25.5 23.1277 25.5 24V28C25.5 28.8723 24.8656 29.5 24.1495 29.5H5.87932C5.1036 29.4033 4.5 28.7236 4.5 28V24ZM47.8505 29.5C47.1344 29.5 46.5 30.1277 46.5 31V35C46.5 35.7357 47.1153 36.4044 47.7803 36.5H66.1495C66.8656 36.5 67.5 35.8723 67.5 35V31C67.5 30.1277 66.8656 29.5 66.1495 29.5H47.8505ZM47.8505 43.5C47.1344 43.5 46.5 44.1277 46.5 45V49C46.5 49.8915 47.1519 50.5 47.7477 50.5H66.1495C66.8656 50.5 67.5 49.8723 67.5 49V45C67.5 44.1277 66.8656 43.5 66.1495 43.5H47.8505ZM4.5 38C4.5 37.1277 5.13445 36.5 5.85047 36.5H24.1495C24.8656 36.5 25.5 37.1277 25.5 38V42C25.5 42.8723 24.8656 43.5 24.1495 43.5H5.85047C5.13445 43.5 4.5 42.8723 4.5 42V38Z" fill={fillColor}/>
    </svg>
  );
};

const ZeroGraphic = withTheme(
  UnthemedZeroGraphic
) as typeof UnthemedZeroGraphic;

export const PipelineEmptyResults: React.FunctionComponent = () => {
  return (
    <div data-testid="pipeline-empty-results">
      <EmptyContent
        icon={ZeroGraphic}
        title="No results"
        subTitle="Try to modify your pipeline to get results"
      />
    </div>
  );
};

export default PipelineEmptyResults;
