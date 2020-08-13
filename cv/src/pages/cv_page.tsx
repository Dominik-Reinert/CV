import * as React from "react";
import { useTranslation } from "react-i18next";
import { Anchor, AnchorItem } from "../anchor/anchor";
import { anchorScroll } from "../App";
import { BackgroundComponent } from "../background/background";
import { CvExperienceSubPageComponent } from "../cv_sub_pages/cv_experience_subpage";
import { CvLandingPageComponent } from "../cv_sub_pages/cv_landing_subpage";
import { CvProfileSubpageComponent } from "../cv_sub_pages/cv_profile_subpage";
import { CvSkillsSubPageComponent } from "../cv_sub_pages/cv_skills_subpage";
import { PageFooter } from "../page_footer/page_footer";
import { SubPageComponent } from "../subpage/subpage_component";

export const CvPageComponent = () => {
  const handleScroll = React.useCallback(() => {}, []);
  React.useEffect(() => {
    console.info(`Adding scroll listener`);
    if (anchorScroll.current) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [anchorScroll.current]);

  const { t } = useTranslation();
  const [selectedAnchor, setSelectedAnchor] = React.useState<string>(undefined);
  const profileAnchor: AnchorItem = {
    anchor: "profile",
    title: t("profile"),
  };
  const cvAnchor: AnchorItem = {
    anchor: "cv",
    title: t("cvHeadline"),
  };
  const skillsAnchor: AnchorItem = {
    anchor: "skills",
    title: t("skillsHeadline"),
  };
  const handleBecomeBiggestElement = React.useCallback(
    (anchor) => {
      anchor !== selectedAnchor && setSelectedAnchor(anchor);
    },
    [selectedAnchor]
  );
  return (
    <BackgroundComponent>
      <CvLandingPageComponent />

      <Anchor
        items={[profileAnchor, cvAnchor, skillsAnchor]}
        selectedItem={selectedAnchor}
      />
      <SubPageComponent
        headline={t("profile")}
        quote={t("profileQuote")}
        anchorId={profileAnchor.anchor}
        onBecomeBiggestElement={handleBecomeBiggestElement}
      >
        <CvProfileSubpageComponent />
      </SubPageComponent>

      <SubPageComponent
        headline={t("cvHeadline")}
        quote={t("cvQuote")}
        quoteAuthor={t("cvQuoteAuthor")}
        colorBackground={true}
        anchorId={cvAnchor.anchor}
        onBecomeBiggestElement={handleBecomeBiggestElement}
      >
        <CvExperienceSubPageComponent />
      </SubPageComponent>

      <SubPageComponent
        headline={t("skillsHeadline")}
        quote={t("skillsQuote")}
        quoteAuthor={t("skillsQuoteAuthor")}
        anchorId={skillsAnchor.anchor}
        onBecomeBiggestElement={handleBecomeBiggestElement}
      >
        <CvSkillsSubPageComponent />
      </SubPageComponent>

      <PageFooter />
    </BackgroundComponent>
  );
};
