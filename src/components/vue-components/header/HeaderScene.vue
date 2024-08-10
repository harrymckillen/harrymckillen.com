<script setup>
import HeaderBuilding from "./HeaderBuilding.vue";

const buildings = [
  "md",
  "xxl",
  "sm",
  "lg",
  "xs",
  "xxl",
  "sm",
  "lg",
  "xl",
  "md",
  "xl",
  "lg",
  "xs",
];

const lines = [
  "xxs",
  "xs",
  "xs",
  "xs",
  "sm",
  "sm",
  "md",
  "md",
  "lg",
  "lg",
  "xl",
  "xl",
];
</script>

<template>
  <header class="header-scene">
    <div class="sky">
      <div class="stars-small"></div>
      <div class="stars-large"></div>
      <div class="sun-wrapper">
        <div class="sun"></div>
      </div>
      <div class="city-scape">
        <header-building
          v-for="(building, index) in buildings"
          :key="index"
          :size="building"
        />
      </div>
    </div>
    <div class="foreground">
      <div
        v-for="line in lines"
        :key="line"
        class="line spacing"
        :class="[line]"
      ></div>
      <div class="line"></div>
    </div>
  </header>
</template>

<style lang="scss">
.header-scene {
  position: absolute;
  width: 100%;
  height: 680px;
  z-index: -1;
  top: 0;

  .line {
    border-bottom: 1px solid #f867fa;
    box-shadow:
      0 0 2px 1px #fff,
      0 0 10px 1px #f867fa;
    height: 1px;
  }

  .spacing {
    &.xxs {
      margin-bottom: 4px;
    }
    &.xs {
      margin-bottom: 8px;
    }
    &.sm {
      margin-bottom: 15px;
    }
    &.md {
      margin-bottom: 25px;
    }
    &.lg {
      margin-bottom: 32px;
    }
    &.xl {
      margin-bottom: 45px;
    }
  }

  .sky {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 400px;
    background: linear-gradient(
      0deg,
      rgba(248, 103, 250, 0.59) 0,
      rgba(255, 255, 255, 0.01) 90%
    );
    overflow: hidden;

    .city-scape {
      position: absolute;
      width: 100%;
      height: 400px;
      top: 0;
      left: 0;
      z-index: 3;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
    }

    .sun-wrapper {
      height: 400px;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;

      .sun {
        margin-top: 100px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: #04d9ff;
        box-shadow:
          0 0 10px 1px #fff,
          0 0 20px 1px #f867fa;
      }
    }

    .stars-large,
    .stars-small {
      position: absolute;
      top: 0;
      left: 0;
    }
    .stars-small {
      z-index: 0;
      width: 1px;
      height: 1px;
      border-radius: 50%;
      background: 0 0;
      box-shadow:
        174px 116px #fff,
        488px 85px #f1f1f1,
        1424px 386px #f1f1f1,
        76px 353px #f1f1f1,
        967px 249px #f1f1f1,
        1622px 140px #f1f1f1,
        93px 364px #f1f1f1,
        1138px 291px #f1f1f1,
        518px 292px #f1f1f1,
        678px 212px #f1f1f1,
        1810px 212px #f1f1f1,
        1867px 339px #f1f1f1,
        2541px 57px #f1f1f1,
        921px 141px #f1f1f1,
        213px 158px #f1f1f1,
        1340px 166px #f1f1f1,
        1824px 182px #f1f1f1,
        2434px 47px #f1f1f1,
        611px 121px #f1f1f1,
        1258px 312px #f1f1f1,
        1134px 153px #f1f1f1,
        2005px 326px #f1f1f1,
        146px 369px #f1f1f1,
        632px 170px #f1f1f1,
        893px 375px #f1f1f1,
        995px 13px #f1f1f1,
        1845px 241px #f1f1f1,
        1692px 245px #f1f1f1,
        2137px 78px #f1f1f1,
        2079px 303px #f1f1f1,
        182px 266px #f1f1f1,
        368px 375px #f1f1f1,
        1972px 285px #f1f1f1,
        2196px 236px #f1f1f1,
        2069px 40px #f1f1f1,
        1537px 191px #f1f1f1,
        943px 140px #f1f1f1,
        979px 146px #f1f1f1,
        80px 287px #f1f1f1,
        1644px 54px #f1f1f1,
        910px 102px #f1f1f1,
        156px 115px #f1f1f1,
        1358px 373px #f1f1f1,
        2234px 195px #f1f1f1,
        1073px 351px #f1f1f1,
        186px 368px #f1f1f1,
        2443px 10px #f1f1f1,
        996px 154px #f1f1f1,
        1368px 261px #f1f1f1,
        427px 211px #f1f1f1,
        2266px 374px #f1f1f1,
        303px 33px #f1f1f1,
        24px 205px #f1f1f1,
        235px 178px #f1f1f1,
        341px 193px #f1f1f1,
        1079px 379px #f1f1f1,
        1588px 182px #f1f1f1,
        23px 192px #f1f1f1,
        1486px 124px #f1f1f1,
        757px 127px #f1f1f1,
        621px 229px #f1f1f1,
        1221px 243px #f1f1f1,
        193px 84px #f1f1f1,
        2141px 205px #f1f1f1,
        1051px 18px #f1f1f1,
        608px 26px #f1f1f1,
        534px 172px #f1f1f1,
        1148px 376px #f1f1f1,
        1485px 372px #f1f1f1,
        2177px 24px #f1f1f1,
        216px 385px #f1f1f1,
        2123px 181px #f1f1f1,
        2408px 251px #f1f1f1,
        736px 269px #f1f1f1,
        2202px 134px #f1f1f1,
        1117px 158px #f1f1f1,
        903px 123px #f1f1f1,
        687px 247px #f1f1f1,
        239px 342px #f1f1f1,
        591px 280px #f1f1f1,
        1920px 269px #f1f1f1,
        2147px 29px #f1f1f1,
        1686px 6px #f1f1f1,
        2009px 264px #f1f1f1,
        920px 210px #f1f1f1,
        1490px 84px #f1f1f1,
        1102px 232px #f1f1f1,
        2464px 100px #f1f1f1,
        1331px 10px #f1f1f1,
        2035px 103px #f1f1f1,
        1386px 162px #f1f1f1,
        2163px 373px #f1f1f1,
        887px 329px #f1f1f1,
        1876px 27px #f1f1f1,
        472px 362px #f1f1f1,
        1220px 55px #f1f1f1,
        1031px 283px #f1f1f1,
        2451px 321px #f1f1f1,
        2441px 268px #f1f1f1,
        653px 4px #f1f1f1,
        1535px 139px #f1f1f1,
        65px 107px #f1f1f1,
        1807px 389px #f1f1f1,
        1075px 299px #f1f1f1,
        2178px 190px #f1f1f1,
        1550px 326px #f1f1f1,
        2046px 81px #f1f1f1,
        2301px 247px #f1f1f1,
        1439px 97px #f1f1f1,
        1127px 197px #f1f1f1,
        2234px 37px #f1f1f1,
        668px 38px #f1f1f1,
        1296px 360px #f1f1f1,
        1544px 358px #f1f1f1,
        1082px 176px #f1f1f1,
        1244px 221px #f1f1f1,
        2169px 157px #f1f1f1,
        1397px 157px #f1f1f1,
        1855px 273px #f1f1f1,
        1564px 222px #f1f1f1,
        68px 124px #f1f1f1,
        157px 213px #f1f1f1,
        2394px 180px #f1f1f1,
        2069px 215px #f1f1f1,
        136px 280px #f1f1f1,
        1103px 184px #f1f1f1,
        253px 383px #f1f1f1,
        539px 67px #f1f1f1,
        1207px 89px #f1f1f1,
        1708px 319px #f1f1f1,
        2532px 50px #f1f1f1,
        2184px 347px #f1f1f1,
        207px 198px #f1f1f1,
        1046px 105px #f1f1f1,
        1471px 355px #f1f1f1,
        1133px 362px #f1f1f1,
        1913px 280px #f1f1f1,
        1479px 51px #f1f1f1,
        1027px 22px #f1f1f1,
        1132px 153px #f1f1f1,
        653px 80px #f1f1f1,
        766px 307px #f1f1f1,
        2144px 160px #f1f1f1,
        512px 190px #f1f1f1,
        1731px 64px #f1f1f1,
        2527px 244px #f1f1f1,
        683px 59px #f1f1f1,
        363px 70px #f1f1f1,
        1789px 383px #f1f1f1,
        1706px 7px #f1f1f1,
        873px 213px #f1f1f1,
        2483px 251px #f1f1f1,
        824px 60px #f1f1f1,
        1588px 336px #f1f1f1,
        615px 4px #f1f1f1,
        256px 172px #f1f1f1,
        2001px 384px #f1f1f1,
        753px 293px #f1f1f1,
        1785px 359px #f1f1f1,
        760px 32px #f1f1f1,
        1647px 107px #f1f1f1,
        1759px 234px #f1f1f1,
        696px 276px #f1f1f1,
        1252px 185px #f1f1f1,
        1645px 389px #f1f1f1,
        459px 318px #f1f1f1,
        496px 130px #f1f1f1,
        2052px 214px #f1f1f1,
        1697px 37px #f1f1f1,
        329px 114px #f1f1f1,
        741px 352px #f1f1f1,
        352px 307px #f1f1f1,
        1381px 163px #f1f1f1,
        1059px 2px #f1f1f1,
        1055px 350px #f1f1f1,
        28px 125px #f1f1f1,
        796px 331px #f1f1f1,
        2424px 188px #f1f1f1,
        1812px 92px #f1f1f1,
        1832px 56px #f1f1f1,
        1425px 307px #f1f1f1,
        2249px 145px #f1f1f1,
        106px 140px #f1f1f1,
        44px 152px #f1f1f1,
        773px 294px #f1f1f1,
        2452px 104px #f1f1f1,
        2431px 86px #f1f1f1,
        2221px 196px #f1f1f1,
        2166px 46px #f1f1f1,
        996px 135px #f1f1f1,
        225px 394px #f1f1f1,
        1687px 349px #f1f1f1,
        320px 65px #f1f1f1,
        129px 301px #f1f1f1,
        1484px 314px #f1f1f1,
        301px 28px #f1f1f1,
        664px 368px #f1f1f1,
        727px 88px #f1f1f1,
        2210px 371px #f1f1f1,
        2340px 54px #f1f1f1,
        2412px 47px #f1f1f1,
        1665px 174px #f1f1f1,
        2195px 205px #f1f1f1,
        1196px 186px #f1f1f1,
        1621px 274px #f1f1f1,
        2239px 309px #f1f1f1,
        856px 20px #f1f1f1,
        1324px 67px #f1f1f1,
        1540px 68px #f1f1f1,
        671px 213px #f1f1f1,
        2062px 14px #f1f1f1,
        136px 210px #f1f1f1,
        2233px 49px #f1f1f1,
        1539px 160px #f1f1f1,
        1074px 261px #f1f1f1,
        6px 16px #f1f1f1,
        1991px 96px #f1f1f1,
        1904px 370px #f1f1f1,
        1897px 385px #f1f1f1,
        2504px 3px #f1f1f1,
        2443px 213px #f1f1f1,
        1406px 231px #f1f1f1,
        928px 55px #f1f1f1,
        2269px 277px #f1f1f1,
        163px 257px #f1f1f1,
        1926px 254px #f1f1f1,
        483px 159px #f1f1f1,
        1109px 141px #f1f1f1,
        1010px 304px #f1f1f1,
        104px 309px #f1f1f1,
        1675px 201px #f1f1f1,
        2134px 327px #f1f1f1,
        1086px 335px #f1f1f1,
        1572px 50px #f1f1f1,
        1739px 95px #f1f1f1,
        267px 68px #f1f1f1,
        2073px 281px #f1f1f1,
        303px 30px #f1f1f1,
        708px 228px #f1f1f1,
        697px 299px #f1f1f1,
        923px 380px #f1f1f1,
        866px 213px #f1f1f1,
        2240px 218px #f1f1f1,
        1369px 101px #f1f1f1,
        948px 192px #f1f1f1,
        1428px 319px #f1f1f1,
        1531px 24px #f1f1f1,
        1256px 89px #f1f1f1,
        1401px 46px #f1f1f1,
        948px 25px #f1f1f1,
        612px 199px #f1f1f1,
        501px 366px #f1f1f1,
        566px 367px #f1f1f1,
        131px 137px #f1f1f1,
        434px 219px #f1f1f1,
        2076px 89px #f1f1f1,
        416px 242px #f1f1f1,
        1992px 338px #f1f1f1,
        982px 95px #f1f1f1,
        2194px 143px #f1f1f1,
        2396px 351px #f1f1f1,
        353px 339px #f1f1f1,
        817px 227px #f1f1f1,
        962px 197px #f1f1f1,
        2px 242px #f1f1f1,
        1364px 213px #f1f1f1,
        1891px 223px #f1f1f1,
        2008px 193px #f1f1f1,
        733px 279px #f1f1f1,
        12px 211px #f1f1f1,
        66px 45px #f1f1f1,
        1809px 188px #f1f1f1,
        1229px 136px #f1f1f1,
        758px 179px #f1f1f1,
        2515px 251px #f1f1f1,
        1715px 77px #f1f1f1,
        1497px 176px #f1f1f1,
        1678px 145px #f1f1f1,
        916px 53px #f1f1f1,
        2460px 148px #f1f1f1,
        645px 111px #f1f1f1,
        1990px 182px #f1f1f1,
        345px 266px #f1f1f1,
        6px 99px #f1f1f1,
        2213px 392px #f1f1f1,
        1713px 176px #f1f1f1,
        2210px 51px #f1f1f1,
        1525px 291px #f1f1f1,
        1421px 27px #f1f1f1,
        2375px 118px #f1f1f1,
        2541px 28px #f1f1f1,
        2104px 395px #f1f1f1,
        1357px 367px #f1f1f1,
        2167px 120px #f1f1f1,
        1111px 179px #f1f1f1,
        1387px 73px #f1f1f1,
        2348px 124px #f1f1f1,
        2302px 130px #f1f1f1,
        1504px 104px #f1f1f1,
        744px 381px #f1f1f1,
        2267px 156px #f1f1f1,
        1768px 17px #f1f1f1,
        1706px 100px #f1f1f1,
        1364px 338px #f1f1f1,
        2279px 236px #f1f1f1,
        815px 127px #f1f1f1,
        258px 184px #f1f1f1,
        1578px 140px #f1f1f1,
        1566px 65px #f1f1f1,
        2078px 366px #f1f1f1,
        996px 201px #f1f1f1,
        294px 319px #f1f1f1,
        2430px 377px #f1f1f1,
        1292px 136px #f1f1f1,
        2504px 4px #f1f1f1,
        2012px 195px #f1f1f1,
        50px 33px #f1f1f1,
        1622px 91px #f1f1f1,
        553px 172px #f1f1f1,
        2398px 360px #f1f1f1,
        521px 69px #f1f1f1,
        1257px 219px #f1f1f1,
        1456px 353px #f1f1f1,
        453px 365px #f1f1f1,
        1237px 381px #f1f1f1,
        2471px 154px #f1f1f1,
        971px 1px #f1f1f1,
        1096px 106px #f1f1f1,
        2060px 164px #f1f1f1,
        1764px 2px #f1f1f1,
        1598px 111px #f1f1f1,
        386px 24px #f1f1f1,
        1911px 280px #f1f1f1,
        1617px 326px #f1f1f1,
        1030px 395px #f1f1f1,
        2128px 110px #f1f1f1,
        6px 174px #f1f1f1,
        718px 211px #f1f1f1,
        2379px 331px #f1f1f1,
        360px 72px #f1f1f1,
        1128px 149px #f1f1f1,
        1869px 181px #f1f1f1,
        2477px 362px #f1f1f1,
        1113px 63px #f1f1f1,
        689px 125px #f1f1f1,
        760px 52px #f1f1f1,
        1994px 236px #f1f1f1,
        1344px 253px #f1f1f1,
        439px 49px #f1f1f1,
        1293px 378px #f1f1f1,
        2459px 378px #f1f1f1,
        1337px 393px #f1f1f1,
        1866px 237px #f1f1f1,
        2074px 86px #f1f1f1,
        1403px 275px #f1f1f1,
        2004px 27px #f1f1f1,
        156px 360px #f1f1f1,
        2059px 108px #f1f1f1,
        1700px 8px #f1f1f1,
        105px 276px #f1f1f1,
        279px 100px #f1f1f1,
        2547px 131px #f1f1f1,
        307px 357px #f1f1f1,
        441px 118px #f1f1f1,
        1819px 321px #f1f1f1,
        221px 358px #f1f1f1,
        1139px 319px #f1f1f1,
        1733px 1px #f1f1f1,
        1431px 54px #f1f1f1,
        1900px 100px #f1f1f1,
        1915px 143px #f1f1f1,
        1374px 93px #f1f1f1,
        1315px 330px #f1f1f1,
        1632px 76px #f1f1f1,
        1309px 158px #f1f1f1,
        836px 295px #f1f1f1,
        2217px 287px #f1f1f1,
        2445px 288px #f1f1f1,
        888px 110px #f1f1f1,
        2403px 236px #f1f1f1,
        117px 312px #f1f1f1,
        2023px 324px #f1f1f1,
        824px 134px #f1f1f1,
        1096px 169px #f1f1f1,
        2275px 224px #f1f1f1,
        413px 93px #f1f1f1,
        429px 43px #f1f1f1,
        1759px 112px #f1f1f1,
        45px 220px #f1f1f1,
        518px 300px #f1f1f1,
        2463px 219px #f1f1f1,
        2160px 151px #f1f1f1,
        198px 104px #f1f1f1,
        612px 109px #f1f1f1,
        2481px 244px #f1f1f1,
        2409px 12px #f1f1f1,
        2510px 145px #f1f1f1,
        1605px 116px #f1f1f1,
        1853px 26px #f1f1f1,
        250px 60px #f1f1f1;
    }
    .stars-large {
      z-index: 0;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: 0 0;
      box-shadow:
        1725px 272px #fff,
        2191px 361px #f1f1f1,
        1234px 316px #f1f1f1,
        2414px 337px #f1f1f1,
        802px 224px #f1f1f1,
        2551px 129px #f1f1f1,
        146px 126px #f1f1f1,
        1209px 12px #f1f1f1,
        1797px 112px #f1f1f1,
        1406px 107px #f1f1f1,
        747px 32px #f1f1f1,
        895px 391px #f1f1f1,
        1132px 364px #f1f1f1,
        2555px 16px #f1f1f1,
        2041px 328px #f1f1f1,
        964px 391px #f1f1f1,
        1856px 292px #f1f1f1,
        546px 145px #f1f1f1,
        1393px 48px #f1f1f1,
        1802px 5px #f1f1f1,
        755px 82px #f1f1f1,
        1891px 262px #f1f1f1,
        1942px 191px #f1f1f1,
        1472px 39px #f1f1f1,
        1128px 191px #f1f1f1,
        2366px 189px #f1f1f1,
        511px 96px #f1f1f1,
        1687px 102px #f1f1f1,
        940px 66px #f1f1f1,
        848px 387px #f1f1f1,
        1273px 267px #f1f1f1,
        2147px 381px #f1f1f1,
        1155px 381px #f1f1f1,
        1407px 134px #f1f1f1,
        544px 185px #f1f1f1,
        1212px 186px #f1f1f1,
        1448px 132px #f1f1f1,
        1596px 163px #f1f1f1,
        25px 51px #f1f1f1,
        1878px 382px #f1f1f1,
        891px 330px #f1f1f1,
        1894px 389px #f1f1f1,
        2131px 145px #f1f1f1,
        1738px 73px #f1f1f1,
        1634px 109px #f1f1f1,
        1659px 389px #f1f1f1,
        1154px 145px #f1f1f1,
        1857px 28px #f1f1f1,
        840px 309px #f1f1f1,
        2536px 200px #f1f1f1,
        651px 182px #f1f1f1,
        1503px 125px #f1f1f1,
        1343px 93px #f1f1f1,
        331px 231px #f1f1f1,
        578px 293px #f1f1f1,
        2317px 370px #f1f1f1,
        912px 341px #f1f1f1,
        2088px 379px #f1f1f1,
        1807px 74px #f1f1f1,
        258px 96px #f1f1f1,
        1929px 166px #f1f1f1,
        633px 244px #f1f1f1,
        996px 120px #f1f1f1,
        959px 183px #f1f1f1,
        1516px 256px #f1f1f1,
        236px 7px #f1f1f1,
        2391px 391px #f1f1f1,
        2554px 67px #f1f1f1,
        1313px 141px #f1f1f1,
        432px 82px #f1f1f1,
        409px 211px #f1f1f1,
        1624px 300px #f1f1f1,
        1260px 190px #f1f1f1,
        1484px 44px #f1f1f1,
        1346px 21px #f1f1f1,
        1187px 283px #f1f1f1,
        479px 391px #f1f1f1,
        498px 311px #f1f1f1,
        1894px 162px #f1f1f1,
        610px 329px #f1f1f1,
        1825px 102px #f1f1f1,
        320px 367px #f1f1f1,
        1216px 114px #f1f1f1,
        258px 285px #f1f1f1,
        1917px 373px #f1f1f1,
        209px 30px #f1f1f1,
        1595px 223px #f1f1f1,
        2404px 228px #f1f1f1,
        399px 359px #f1f1f1,
        2381px 235px #f1f1f1,
        2379px 63px #f1f1f1,
        1755px 322px #f1f1f1,
        1059px 28px #f1f1f1,
        2435px 46px #f1f1f1,
        946px 70px #f1f1f1,
        2404px 129px #f1f1f1,
        2365px 191px #f1f1f1,
        1100px 41px #f1f1f1,
        2078px 245px #f1f1f1,
        1054px 60px #f1f1f1;
    }
  }
}
</style>
