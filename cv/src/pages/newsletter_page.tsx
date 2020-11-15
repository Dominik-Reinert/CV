import { css } from "@emotion/core";
import * as React from "react";
import { BackButtonComponent } from "../back_button/back_button_component";
import { ButtonComponent } from "../button/button_component";
import { fetchNewsletterAll } from "../generated/endpoints/all_fetch";
import { fetchNewsletterSubscribe } from "../generated/endpoints/subscribe_fetch";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { PageFooter } from "../page_footer/page_footer";
import { RouteURL } from "../router/router";
import { Newsletter } from "./newsletter";

export const NewsletterPageComponent = () => {
  const [subscribed, setSubscribed] = React.useState<boolean>(false);
  const emailInputRef = React.useRef<HTMLInputElement>(undefined);
  const nameInputRef = React.useRef<HTMLInputElement>(undefined);
  const lastNameInputRef = React.useRef<HTMLInputElement>(undefined);
  const handleSubmit = React.useCallback(() => {
    if (
      emailInputRef.current.validity.valid &&
      nameInputRef.current.validity.valid &&
      lastNameInputRef.current.validity.valid
    ) {
      fetchNewsletterSubscribe(
        {
          name: nameInputRef.current.value,
          lastName: lastNameInputRef.current.value,
          email: emailInputRef.current.value,
        },
        () => {
          setSubscribed(true);
        },
        () => {
          console.error("something went wrong!");
        }
      );
    }
  }, [emailInputRef.current, nameInputRef.current, lastNameInputRef.current]);

  let [subscriptions, setSubscriptions] = React.useState<Newsletter[]>([]);
  React.useEffect(() => {
    fetchNewsletterAll(
      (response) => setSubscriptions(response.subscriptions),
      () => {
        console.error(`error fetching newsletters!`);
      }
    );
  }, [subscribed]);

  const subscribeStyle = useSubscribeStyle();
  return (
    <div css={subscribeStyle}>
      <BackButtonComponent backLink={RouteURL.HOME} />

      <div className="subscribe-form">
        <div className="headline">
          Subscribe to get access to the latest news on remote working
        </div>
        <div className="submit-group">
          <div className="input-wrapper">
            <input
              ref={nameInputRef}
              type="text"
              required={true}
              maxLength={32}
              placeholder="name"
            />
          </div>
          <div className="input-wrapper">
            <input
              ref={lastNameInputRef}
              type="text"
              required={true}
              maxLength={32}
              placeholder="last name"
            />
          </div>
          <div className="input-wrapper">
            <input
              ref={emailInputRef}
              type="email"
              required={true}
              maxLength={500}
              placeholder="email"
            />
          </div>
          <ButtonComponent label={"Subscribe"} onClick={handleSubmit} />
        </div>
      </div>

      {subscribed && (
        <div>
          Successfully subscribed to newsletter! Please check your email for the
          activation link!
        </div>
      )}

      <div>
        Subscriptions:
        {subscriptions.map((u) => (
          <div key={u._id}>{u.email}</div>
        ))}
      </div>
      <PageFooter />
    </div>
  );
};

const useSubscribeStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: subscribe-form;

    .subscribe-form {
      display: flex;
      flex-direction: column;

      min-height: 180px;

      padding: 20px;

      width: 50%;
      margin: auto;
      background-color: ${theme.grayscale.background};
      border: 0.5px solid ${theme.grayscale.borderOnBackground};

      > * {
      }

      .headline {
        color: ${theme.grayscale.labelOnBackground};
        border-bottom: 0.5px solid ${theme.grayscale.borderOnBackground};
        padding-bottom: 12px;
        margin-bottom: 12px;
      }

      .submit-group {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 220px;

        .input-wrapper {
          background-color: white;

          padding: 4px;

          input {
            border: none;
            font-size: 14px;
            padding: 6px;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  `;
};
