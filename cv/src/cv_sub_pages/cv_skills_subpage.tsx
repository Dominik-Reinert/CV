import { css } from "@emotion/core";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { BrandIcon, BrandIconComponent } from "../webfont_icon/brand_icon";
import {
  WebfontIcon,
  WebfontRegularIconComponent,
  WebfontSolidIconComponent,
} from "../webfont_icon/webfont_icon";

interface SkillsPageComponentProps {}

export const CvSkillsSubPageComponent: React.FunctionComponent<React.PropsWithChildren<
  SkillsPageComponentProps
>> = (props: React.PropsWithChildren<SkillsPageComponentProps>) => {
  const { t, i18n } = useTranslation();
  const skillsRootStyle = useSkillsRootStyle();
  const skillsListStyle = useSkillsListStyle();
  const skillsLayouterStyle = useLayouterStyle();

  const Stars = (props) => <div className="stars">{props.children}</div>;

  const Skill = (props: {
    stars: number;
    name?: string;
    keyAddendum?: string;
  }) => (
    <div className="skill">
      {props.name && <SkillTitle>{props.name}</SkillTitle>}
      {Array(props.stars)
        .fill(0)
        .map((item, idx) => (
          <WebfontSolidIconComponent
            key={`${idx}-star-${props.name}-${props.keyAddendum}`}
            webfontIcon={WebfontIcon.STAR}
          />
        ))}
      {Array(5 - props.stars)
        .fill(0)
        .map((item, idx) => (
          <WebfontRegularIconComponent
            key={`${idx}-star-${props.name}`}
            webfontIcon={WebfontIcon.STAR}
          />
        ))}
    </div>
  );

  const FiveFullStars = (props: { keyAddendum: string }) => (
    <Skill stars={5} {...props} />
  );

  const SkillTitle = (props) => (
    <div className="skill-title">{props.children}</div>
  );
  const Technology = (props) => (
    <span className="technology">{props.children}</span>
  );

  const TopTechnology = (props: { name: string; icon?: BrandIcon }) => (
    <div className={`${props.name.toLowerCase()}-root`}>
      <SkillTitle>
        {props.icon && <BrandIconComponent brandIcon={props.icon} />}
        <Technology>{props.name}</Technology>
      </SkillTitle>
      <Stars>
        <FiveFullStars keyAddendum={`${props.name.toLowerCase()}`} />
      </Stars>
    </div>
  );

  return (
    <div className="skills-root" css={skillsRootStyle}>
      <div className="top-skills">
        <TopTechnology name="Typescript" />
        <div className="layouter" css={skillsLayouterStyle}>
          <TopTechnology name={t("functionalPrograming")} />
          <TopTechnology name="React" />
        </div>
      </div>
      <div className="skills-list" css={skillsListStyle}>
        <div className="hard-skills">
          <div className="header">{t("hardSkills")}</div>
          <Skill name="CSS (+ LESS)" stars={4} />
          <Skill name="JQuery" stars={4} />
          <Skill name="Java" stars={3} />
        </div>
        <div className="soft-skills">
          <div className="header">{t("softSkills")}</div>
          <Skill name={t("agileProcesses")} stars={4} />
          <Skill name={t("communication")} stars={4} />
          <Skill name={t("timeManagement")} stars={3} />
        </div>
      </div>
      <div className="skills-list" css={skillsListStyle}>
        <div className="language-skills">
          <div className="header">{t("languages")}</div>
          <Skill name={t("german")} stars={5} />
          <Skill name={t("english")} stars={5} />
          <Skill name={t("french")} stars={1} />
        </div>
        <div className="tools-skills">
          <div className="header">{t("tools")}</div>
          <Skill name="Git" stars={4} />
          <Skill name="Chrome" stars={4} />
          <Skill name="Placeholder" stars={3} />
        </div>
      </div>
    </div>
  );
};

const useSkillsRootStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: skills-root;

    display: flex;
    flex-direction: column;
    text-align: center;

    .fa-star {
      margin-left: 4px;
    }

    .technology {
      color: ${theme.grayscale.labelOnBackground};
      font-size: ${theme.fonts.subHeadline.size};
      font-weight: ${theme.fonts.subHeadline.weight};
    }

    .stars {
      margin-top: 8px;
      color: ${theme.grayscale.labelOnBackground};
    }

    .top-skills {
      margin-bottom: 40px;

      .technology {
        color: ${theme.colors.normal};
      }
    }

    @media only screen and (max-width: 1000px) {
      .top-skills {
        .skill-title {
          margin-top: 24px;
        }
      }
    }
  `;
};

const useSkillsListStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: skills-list;

    display: flex;
    margin-bottom: 40px;

    .header {
      color: ${theme.colors.normal};
      font-size: ${theme.fonts.subHeadline.size};
      font-weight: ${theme.fonts.subHeadline.weight};
      margin: 8px 0;
    }

    .skill {
      display: flex;

      .skill-title {
        font-size: larger;
        flex: 12 0 0;
        text-align: left;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        color: ${theme.grayscale.labelOnBackground};
        font-size: ${theme.fonts.normal.size};
        font-weight: ${theme.fonts.normal.weight};
      }

      i {
        margin: auto;
        color: ${theme.grayscale.labelOnBackground};
        font-size: ${theme.fonts.normal.size};
      }

      margin: 8px;
    }

    > [class*="-skills"] {
      width: 50%;

      &:first-of-type {
        margin-right: 8px;
      }

      &:last-of-type {
        margin-left: 8px;
      }
    }

    @media only screen and (max-width: 1000px) {
      flex-direction: column;

      > [class*="-skills"] {
        width: 100%;
        margin-bottom: 40px;
      }
    }
  `;
};

const useLayouterStyle = () => {
  return css`
    label: skills-layouter;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
    }
  `;
};
