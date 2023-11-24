import React from "react";
import youtubeIcon from "../../assets/icons/youtube.svg";
import reditIcon from "../../assets/icons/reddit.svg";
import mediumIcon from "../../assets/icons/medium.svg";
import facebookIcon from "../../assets/icons/Facebook.svg";
import telegramIcon from "../../assets/icons/tele.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import discordIcon from "../../assets/icons/discord-01.svg";
import logo from "../../assets/icons/logo.png";
import styled from "styled-components";

const LINK_TW = "https://twitter.com/FiFaFootball_io";
const LINK_TELE = "https://t.me/FiFaFootballChannel";
const LINK_FB = "https://www.facebook.com/FiFafootball.io";
const LINK_REDDIT = "https://www.reddit.com/r/FiFafootball2022";
const LINK_YT = "https://www.youtube.com/watch?v=MbI1qYA-4IE";
const LINK_DISCORD = "https://discord.com/invite/43PuqVBV";

const Wrapper = styled.div``;

const Icon = styled.img`
  width: 40%;
  height: auto;
  @media (max-width: 768px) {
    width: 50%;
  }
  &: hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 50%;
  height: auto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
`;

const Text = styled.div`
  font: normal normal normal 12px/50px Poppins;
  text-align: left;
  color: white;
  line-height: 17px;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    font: normal normal normal 10px/20px Poppins;
    text-align: center !important;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="text-md-start text-center">
              <Logo src={logo} />
            </div>
            <Text className="pt-sm-4 pt-2">
              Contact Us <br /> admin@fifafootball.io
            </Text>
          </div>
          <div className="col-12 col-sm-6">
            <Text>Social:</Text>

            <div className="row pb-4">
              <div className="col">
                <a href={LINK_TW} alt="tw" target="_blank" rel="noreferrer">
                  <Icon src={twitterIcon} />
                </a>
              </div>
              <div className="col">
                <a href={LINK_TELE} alt="tw" target="_blank" rel="noreferrer">
                  <Icon src={telegramIcon} />
                </a>
              </div>
              <div className="col">
                <a href={LINK_FB} alt="tw" target="_blank" rel="noreferrer">
                  <Icon src={facebookIcon} />
                </a>
              </div>
              <div className="col">
                <a href={LINK_YT} alt="tw" target="_blank" rel="noreferrer">
                  <Icon src={youtubeIcon} />
                </a>
              </div>
              <div className="col">
                <a href={LINK_REDDIT} alt="tw" target="_blank" rel="noreferrer">
                  <Icon src={reditIcon} />
                </a>
              </div>
              <div className="col">
                <a
                  href={LINK_DISCORD}
                  alt="dc"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon src={discordIcon} />
                </a>
              </div>
            </div>
            <Text>@2022 FIFA Football, all rights reserved</Text>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
