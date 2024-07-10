import { DefaultPageContainer } from './PageContent.style';
import React, { memo } from 'react';

const DefaultPageContent = memo(({ children }: { children: React.ReactNode }) => {
  return (
      <DefaultPageContainer>
          {children}
      </DefaultPageContainer>
    );
  }
);

export default DefaultPageContent;