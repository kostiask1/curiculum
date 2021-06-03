import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer" id="contacts">
        <div className="container">
          <small>Понравилось?</small>
          <h4>Давай поговорим!</h4>
          <div className="contacts">
            <a href="\">kostiask.</a>
            <div className="wrap">
              <button className="button call-form">
                <div className="maskbtn maskbtn-send" />
                Напиши мне
              </button>
              <a
                className="button"
                href="https://www.upwork.com/o/profiles/users/~01fb767ca954c799bb/"
              >
                <div className="maskbtn maskbtn-load" />
                Мое резюме
              </a>
            </div>
          </div>
        </div>
        <div className="footer-line">
          <svg
            className="footer-line-1"
            width={196}
            height={276}
            viewBox="0 0 196 276"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M194.158 289.85C180.811 293.479 175.897 298.359 161.612 295.096C116.007 284.679 79.2447 265.881 54.1182 224.742C30.5224 186.109 18.1855 134.015 29.8333 89.4737C36.4434 64.1967 41 24.5 -7.5 1.5"
              stroke="var(--main)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          </svg>
          <svg
            className="footer-line-2"
            width={1920}
            height={238}
            viewBox="0 0 1920 238"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-8 377.464C56.9694 361.96 120.875 339.869 185.029 321.371C249.314 302.834 313.532 283.755 376.041 259.777C425.042 240.981 475.801 219.408 516.459 185.352C551.127 156.313 585.308 99.3984 559.263 53.9165C545.502 29.8865 511.447 4.64397 483.279 1.30565C465.063 -0.853323 440.942 8.39889 440.659 29.9025C440.135 69.7125 485.647 81.6615 516.642 86.363C573.596 95.002 627.908 88.5318 682.266 70.5064C720.1 57.9605 760.697 34.6615 801.511 47.6839C843.905 61.2102 870.815 100.143 875.57 143.465C882.953 210.735 844.47 282.468 807.56 335.669C787.236 364.966 762.557 391.37 732.219 410.461C718.944 418.814 684.313 439.836 670.992 420.085C659.748 403.413 663.474 376.139 666.043 357.758C672.362 312.536 688.59 267.228 710.221 227.148C769.187 117.887 894 63.6539 1010.03 37.785C1092.07 19.4943 1176.02 17.4518 1259.7 16.5206C1365.1 15.3479 1470.03 18.5591 1575.28 23.6699C1652.96 27.4421 1730.52 28.4686 1808.27 29.7192C1862.78 30.5961 1917.93 31.182 1970.32 48.0505C1983.53 52.3066 2001.73 56.9544 2009.73 68.9482"
              stroke="var(--main)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          </svg>
          <svg
            className="footer-line-3"
            width={189}
            height={341}
            viewBox="0 0 189 341"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M207.5 1.5C105 9.5 -62 67.5 26.905 131.642C69.1171 151.803 100.865 178.202 116.362 223.848C130.915 266.714 131.532 320.246 110.404 361.15C98.4139 384.363 79.7386 392.777 55.0435 395.246"
              stroke="var(--main)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
