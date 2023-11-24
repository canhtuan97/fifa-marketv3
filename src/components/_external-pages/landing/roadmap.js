import styled from "styled-components";
import ICON from "./../../../assets/roadmap/group_175.svg";
import "./roadmap.css";

const Wrapper = styled.div``;

const WrapperText = styled.div`
  margin-left: 7%;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgResponsive = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.div`
  font: normal normal bold 14px/20px Poppins;
  color: white;
  letter-spacing: 2px;
  line-height: 25px;
  white-space: nowrap;
  padding-left: 16px;
  @media (min-width: 768px) {
    font: normal normal bold 18px/30px Poppins;
  }
`;

const Content = styled.div`
  font: normal normal normal 12px/50px Poppins;
  color: white;
  text-align: center;
  line-height: 17px;
  @media (min-width: 768px) {
    font: normal normal normal 14px/20px Poppins;
  }
`;

const ContentMobile = styled.div`
  font: normal normal normal 12px/50px Poppins;
  color: white;
  text-align: left;
  line-height: 17px;
  padding-bottom: 10px;
`;

const Roadmap = () => {
  const TimeLineMobile = () => {
    return (
      <div class="timeline">
        <div class="outer">
          <div class="card-x">
            <div class="info">
              <h3 class="title">
                <Title>PHASE 1 - Q3 2022</Title>
              </h3>

              <ContentMobile className="ms-3">
                IDO <br />
                Launch NFT sale <br />
                Release Market <br />
                Kickstart Tournament Mode <br />
              </ContentMobile>
            </div>
          </div>
          <div class="card-x">
            <div class="info">
              <h3 class="title" style={{ marginRight: "-5px" }}>
                <Title>PHASE 2 - Q4 2022</Title>
              </h3>

              <ContentMobile className="ms-3">
                Manager Mode <br />
                Release results prediction of football matches
              </ContentMobile>
            </div>
          </div>
          <div class="card-x">
            <div class="info">
              <h3 class="title">
                <Title>PHASE 3 - Q1 2023</Title>
              </h3>

              <ContentMobile className="ms-3">Simulation mode</ContentMobile>
            </div>
          </div>
          <div class="card-x">
            <div class="info">
              <h3 class="title" style={{ marginRight: "-5px" }}>
                <Title className="text-left">PHASE 4 - Q2 2023</Title>
              </h3>

              <ContentMobile className="ms-3">
                5V5 PVP Ranked Match
              </ContentMobile>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Wrapper className="d-block d-sm-block d-md-none">
        <TimeLineMobile />
      </Wrapper>
      <Wrapper className="d-none d-lg-block">
        <div class="ps-timeline-sec">
          <div class="container px-0">
            <ol class="ps-timeline">
              <li>
                <div class="img-handler-top">
                  <WrapperText>
                    <div>
                      <Title>PHASE 1 - Q3 2022</Title>
                      <Content>
                        IDO <br />
                        Launch NFT sale <br />
                        Release Market <br />
                        Kickstart Tournament Mode <br />
                      </Content>
                    </div>
                  </WrapperText>
                </div>
                <span class="ps-sp-top">
                  <ImgResponsive src={ICON} />
                </span>
              </li>
              <li>
                <div class="img-handler-bot">
                  <WrapperText>
                    <div>
                      <Title>PHASE 2 - Q4 2022</Title>
                      <Content>
                        Manager Mode <br />
                        Release results prediction of football matches
                      </Content>
                    </div>
                  </WrapperText>
                </div>

                <span class="ps-sp-bot">
                  <ImgResponsive src={ICON} />
                </span>
              </li>
              <li>
                <div class="img-handler-top">
                  <WrapperText>
                    <div>
                      <Title>PHASE 3 - Q1 2023</Title>
                      <Content>Simulation mode</Content>
                    </div>
                  </WrapperText>
                </div>

                <span class="ps-sp-top">
                  <ImgResponsive src={ICON} />
                </span>
              </li>
              <li>
                <div class="img-handler-bot">
                  <WrapperText>
                    <div>
                      <Title>PHASE 4 - Q2 2023</Title>
                      <Content>5V5 PVP Ranked Match</Content>
                    </div>
                  </WrapperText>
                </div>
                <span class="ps-sp-bot">
                  <ImgResponsive src={ICON} />
                </span>
              </li>
            </ol>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export { Roadmap };
