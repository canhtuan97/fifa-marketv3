import styled from "styled-components";
import I2 from "./../../../assets/team/2.png";
import I3 from "./../../../assets/team/3.png";
import I4 from "./../../../assets/team/4.png";
import I5 from "./../../../assets/team/5.png";
import I9 from "./../../../assets/team/9.png";
import I10 from "./../../../assets/team/10.png";

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

const WrapperItem = styled.div`
  width: 100%;
  &: hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const ResponsiveImg = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;

const Text1 = styled.div`
  font: normal normal bold 18px/20px Poppins;
  color: white;
  letter-spacing: 4px;
  line-height: 25px;
  white-space: nowrap;
  text-align: center;
`;

const Text2 = styled.div`
  font: normal normal normal 14px/50px Poppins;
  color: white;
  text-align: center;
  line-height: 17px;
  white-space: nowrap;
  text-align: center;
`;

const Team = () => {
  return (
    <Wrapper>
      <div className="container p-0">
        <div className="row row-cols-3 row-cols-md-3 gy-4 gy-md-5">
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I9} />
              <Text1 className="name-team">LEON</Text1>
              <Text2 className="content-team">OPERATIONAL LEAD</Text2>
            </WrapperItem>
          </div>
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I2} />
              <Text1 className="name-team">BRAM</Text1>
              <Text2 className="content-team">TECH LEAD</Text2>
            </WrapperItem>
          </div>
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I3} />
              <Text1 className="name-team">DOMINIC</Text1>
              <Text2 className="content-team">FINANCIAL SUPPORT</Text2>
            </WrapperItem>
          </div>
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I4} />
              <Text1 className="name-team">HUUB</Text1>
              <Text2 className="content-team">CONTENT MARKETEER</Text2>
            </WrapperItem>
          </div>
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I5} />
              <Text1 className="name-team">RENIET</Text1>
              <Text2 className="content-team">DESIGNER</Text2>
            </WrapperItem>
          </div>
          <div className="col">
            <WrapperItem>
              <ResponsiveImg src={I10} />
              <Text1 className="name-team">THOMASFULL</Text1>
              <Text2 className="content-team">STACK DEVELOPER</Text2>
            </WrapperItem>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export { Team };
