import * as React from "react";

export default function MyComponent(props) {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="div-4">
              <div className="div-5">StockZ</div>
            </div>
          </div>
          <div className="div-6">
            <div className="builder-columns div-7">
              <div className="builder-column column">
                <div className="div-8">
                  <div className="div-9">First Name</div>
                  <div className="div-10">
                    <div className="div-11" />
                  </div>
                  <div className="div-12">Username</div>
                  <div className="div-13">
                    <div className="div-14" />
                  </div>
                  <div className="div-15">Password</div>
                  <div className="div-16">
                    <div className="div-17" />
                  </div>
                </div>
              </div>
              <div className="builder-column column-2">
                <div className="div-18">
                  <div className="div-19">Last Name</div>
                  <div className="div-20">
                    <div className="div-21" />
                  </div>
                  <div className="div-22">Email</div>
                  <div className="div-23">
                    <div className="div-24" />
                  </div>
                  <div className="div-25">Confirm Password</div>
                  <div className="div-26">
                    <div className="div-27" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="div-28">
            <div className="div-29">
              <div className="div-30">
                <div className="div-31">Sign Up</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          display: flex;
          flex-direction: column;
          max-width: 1920px;
          justify-content: center;
          align-items: center;
          padding-top: 61px;
          padding-right: 143px;
          padding-bottom: 61px;
          padding-left: 143px;
          background-color: rgba(255, 255, 255, 1);
        }
        .div-2 {
          display: flex;
          flex-direction: column;
          max-width: 994px;
          justify-content: flex-start;
          align-items: center;
        }
        .div-3 {
          display: flex;
          flex-direction: column;
          max-width: 240px;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .div-4 {
          display: flex;
          flex-direction: column;
          max-width: 240px;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .div-5 {
          display: flex;
          flex-direction: row;
          max-width: 220px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(115, 194, 251, 1);
          font-size: 64px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Inter", sans-serif;
        }
        .div-6 {
          display: flex;
          flex-direction: column;
          max-width: 994px;
          margin-top: 13px;
        }
        .div-7 {
          display: flex;
        }
        @media (max-width: 999px) {
          .div-7 {
            flex-direction: column;
            align-items: stretch;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: calc(69.73% - 10px);
          margin-left: 0px;
        }
        @media (max-width: 999px) {
          .column {
            width: 100%;
          }
        }
        .div-8 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: center;
        }
        .div-9 {
          display: flex;
          flex-direction: row;
          max-width: 200px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-10 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-11 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .div-12 {
          display: flex;
          flex-direction: row;
          max-width: 157px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-13 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-14 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .div-15 {
          display: flex;
          flex-direction: row;
          max-width: 147px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-16 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-17 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: calc(69.73% - 10px);
          margin-left: 20px;
        }
        @media (max-width: 999px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-18 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: center;
        }
        .div-19 {
          display: flex;
          flex-direction: row;
          max-width: 200px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-20 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-21 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .div-22 {
          display: flex;
          flex-direction: row;
          max-width: 85px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-23 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-24 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .div-25 {
          display: flex;
          flex-direction: row;
          max-width: 300px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(0, 0, 0, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
        .div-26 {
          display: flex;
          flex-direction: column;
          max-width: 387px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
        .div-27 {
          display: flex;
          max-width: 367px;
          height: 48px;
          width: 367px;
          border-radius: 12px;
          background-color: rgba(237, 239, 242, 1);
        }
        .div-28 {
          display: flex;
          flex-direction: column;
          max-width: 159px;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 13px;
        }
        .div-29 {
          display: flex;
          flex-direction: column;
          max-width: 159px;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .div-30 {
          display: flex;
          flex-direction: row;
          max-width: 159px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          background-color: rgba(15, 82, 171, 1);
        }
        .div-31 {
          display: flex;
          flex-direction: row;
          max-width: 150px;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          color: rgba(255, 255, 255, 1);
          font-size: 32px;
          letter-spacing: 0%;
          text-align: left;
          font-family: "Raleway", sans-serif;
        }
      `}</style>
    </>
  );
}