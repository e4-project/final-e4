"use client";
import Link from "next/link";
import mainstyle from "./mainstyle.module.css";
import "@/styles/global.css";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 인트로페이지
 * @returns number
 */

declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
  }
}
declare module "next-auth" {
  interface Session {
    redirect?: string;
  }
}

export default function Mainpage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchUserAndRedirect = async () => {
      if (session) {
        // 세션 ID를 사용하여 DB에서 사용자 정보를 가져옵니다.
        const response = await fetch(`/api/duplicatename`);
        const dbUser = await response.json();
        console.log(dbUser);

        // changename 필드가 false인 경우 리다이렉트를 수행합니다.
        if (dbUser.changename.changename === false) {
          router.push("/hello");
        }
      }
    };

    fetchUserAndRedirect();
  }, [session, router]);
  // 1
  useEffect(() => {
    const area1 = document.querySelector(`.${mainstyle.text_anime}`);
    const area2 = document.querySelector(`.${mainstyle.text_anime2}`);

    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (area1) {
      observer.observe(area1);
    }
    if (area2) {
      observer.observe(area2);
    }
    function startAnimation(element: any) {
      element.classList.add(`${mainstyle.animating}`);
    }
  }, []);
  // 2
  useEffect(() => {
    const text_area1 = document.querySelector(`.${mainstyle.text_area}`);
    const text_area2 = document.querySelector(`.${mainstyle.text_area2}`);

    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (text_area1) {
      observer.observe(text_area1);
    }
    if (text_area2) {
      observer.observe(text_area2);
    }
    function startAnimation(element: any) {
      element.classList.add(`${mainstyle.appear}`);
    }
  }, []);
  // 3
  useEffect(() => {
    const text_area1 = document.querySelector(`.${mainstyle.study_img}`);

    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (text_area1) {
      observer.observe(text_area1);
    }
    function startAnimation(element: any) {
      element.classList.add(`${mainstyle.img_anime}`);
    }
  }, []);

  return (
    <>
      {/* <div className={mainstyle.page_start}>
              <div className={mainstyle.page_start_text}></div>
            </div> */}
      <div className={mainstyle.body}>
        <div className={mainstyle.frame}>
          <div className={mainstyle.area1}>
            <div className={mainstyle.sheet}>
              <div className={mainstyle.left_area}>
                <h1
                  className={mainstyle.text_anime}
                  data-text="스터디 모임을 찾고 있다구요?"
                >
                  스터디 모임을 찾고 있다구요?
                </h1>
                <div className={mainstyle.text_area}>
                  <h2>e4에서 새로운 스터디그룹을 찾아보세요</h2>
                  <span> </span>
                  <p>스터디와 사이드프로젝트를 찾는 곳</p>
                </div>
              </div>
              <div className={mainstyle.right_area}>
                <ul className={mainstyle.img_sheet}>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                </ul>
                <ul className={mainstyle.img_sheet2}>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                  <li>
                    <img src="/img/test_img.png" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={mainstyle.area2}>
            <div className={mainstyle.sheet}>
              <div className={mainstyle.left_area}>
                <div className={mainstyle.img_area}>
                  <img
                    className={mainstyle.study_img}
                    src="/img/test_img2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className={mainstyle.right_area}>
                <h1
                  className={mainstyle.text_anime2}
                  data-text="하고싶은 스터디가 없다구요?"
                >
                  하고싶은 스터디가 없다구요?
                </h1>
                <div className={mainstyle.text_area2}>
                  <h2>
                    e4에서
                    <br />
                    새로운 스터디원을 모집해 보세요
                  </h2>
                  <p>
                    당신이
                    <strong> 생각하는, 하고싶은</strong>
                    스터디가 없다면
                    <br />
                    사람들을 모집해
                    <br />
                    <strong>직접 스터디 그룹을 만들어 보세요</strong>
                  </p>
                  <div className={mainstyle.button_container}>
                    <button className={mainstyle.start_button}>
                      <Link href="/study">
                        <p className={mainstyle.start_button_text}>드과자</p>
                        <p className={mainstyle.start_button_text}>시작하기</p>
                      </Link>
                    </button>
                  </div>
                  <span> </span>
                  <p>새로운 스터디그룹을 만들어 모두를 초대하세요</p>
                </div>
              </div>
            </div>
          </div>
          <div className={mainstyle.area3}>
            <ul className={mainstyle.sheet}>
              <li>
                <p>영역</p>
              </li>
              <li>
                <p>영역</p>
              </li>
              <li>
                <p>영역</p>
              </li>
            </ul>
          </div>
          <div className={mainstyle.footer}>
            <div></div>
            <div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
