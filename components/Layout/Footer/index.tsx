// "use client";

import styles from "./style.module.css";
import { Footer as FooterAnt } from "antd/es/layout/layout";
import ThemeProvider from "@/components/ConfigProvider";
import Container from "@/components/Layout/Container";
import { Button, Col, Divider, Row } from "antd";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faEnvelope, faMapLocation, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ style }: any) => {
  return (
    <ThemeProvider {...{ style }}>
      <FooterAnt className={styles.main_footer}>
        <div className={styles.footer_inner}>
          <Container>
            <Row gutter={[24, 24]}>
              <Col lg={6} md={24}>
                <div className={styles.footer_widget}>
                  <Logo />
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                  <div className={styles.hours}>
                    <span>
                      دوشنبه تا جمعه:<strong> 8 صبح تا 6 بعد از ظهر</strong>
                    </span>
                  </div>
                  <div className={styles.hours}>
                    <span>
                      دوشنبه تا جمعه:<strong> 8 صبح تا 6 بعد از ظهر</strong>
                    </span>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={24}>
                <div className={styles.footer_widget}>
                  <div className={styles.footer_widget_title}>
                    <h4>لینک های مفید</h4>
                  </div>
                  <ul className={styles.footer_list}>
                    <li>
                      <a href="about.html">درباره شرکت ما</a>
                    </li>
                    <li>
                      <a href="blog.html">آخرین اخبار ما</a>
                    </li>
                    <li>
                      <a href="pricing.html">طرح های قیمت گذاری</a>
                    </li>
                    <li>
                      <a href="contacts.html">تماس با ما</a>
                    </li>
                    <li>
                      <a href="help.html">مرکز کمک</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={6} md={24}>
                <div className={styles.footer_widget}>
                  <div className={styles.footer_widget_title}>
                    <h4>اطلاعات تماس</h4>
                  </div>
                  <ul className={styles.footer_contacts}>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} size="1x" /> ایمیل:
                      </span>
                      <a href="#" target="_blank">
                        setinco@gmail.com
                      </a>
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faMapLocation} size="1x" /> آدرس:
                      </span>
                      <a href="#" target="_blank">
                        {" "}
                        ایران،یزد،مطهری
                      </a>
                    </li>
                    <li>
                      <span>
                        <FontAwesomeIcon icon={faPhone} size="1x" /> تلفن:
                      </span>
                      <a href="#">0353202560</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={6} md={24}>
                <div className={styles.footer_widget}>
                  <div className={styles.footer_widget_title}>
                    <h4>دانلود نرم افزار</h4>
                  </div>
                  <p>شروع به کار با کنید که می تواند هر آنچه را که نیاز دارید فراهم کند</p>
                  <Button type="primary" size={"large"} icon={<FontAwesomeIcon icon={faAppleWhole} size="1x" />}>
                    اپ استور
                  </Button>
                  <Button type="primary" size={"large"}>
                    اپ استور
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={styles.sub_footer}>
          <Container>
            <div className={styles.copyright}> © تمامی حقوق محفوظ است</div>
            <div className={styles.subfooter_nav}>
              <ul>
                <li>
                  <a href="#">شرایط استفاده</a>
                </li>
                <li>
                  <a href="#">حریم خصوصی</a>
                </li>
                <li>
                  <a href="#">وبلاگ</a>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </FooterAnt>
    </ThemeProvider>
  );
};
export default Footer;
