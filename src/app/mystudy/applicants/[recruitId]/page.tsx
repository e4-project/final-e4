import { MongoClient } from "mongodb"
// import { connectDB } from "@/dummydata"
import { ObjectId } from "mongodb"
import {loadRecruit} from '@/axios/fetcher/recruit/loadRecruit';
import {connectDB} from '@/config/db/connectDB'
import style from './applicants.module.css';

/**
 * @name applicants
 * @author 강이경
 * @desc 스터디 참여 신청자 목록 페이지: 스터디 정보, 스터디 시작버튼, 참여 신청자 및 신청메세지, 신청자 승인/거절
 */


export default async function Applicants(props) {
    // let db = (await connectDB).db('e4');
    // let applicantData = await db.collection('applicant').findOne({applypostid: props.params.recruitId}); //유저 참여 신청
    // let mypost = await db.collection('posts').findOne({_id: new ObjectId(props.params.recruitId) }); //모집공고
    // 모집글post의 _id, 신청 메세지message, applicant_name(신청자이름)

    // const {data} = await loadRecruit();
    // data.map((item: any )=> console.log({itemName: item._id}))


    return(
        <div className={style.bg}>
            <div className={style.container}>
                <div className={style.left_container}>
                    <div className={style.study_info}>
                        <StudyInfo/>
                        {/* <StudyInfo studyName={내가작성한recrutPost.studyName} material={내가작성한recrutPost.material}/> */}
                    </div>
                    <button className={style.study_start}>스터디 시작하기</button>
                    {/* 스터디 시작시 스터디페이지 생성, 모집글 목록에서 숨김, 신청 마감(모집글에서 신청하기 버튼 비활성 */}
                    
                    <div className={style.member}>승인한 멤버들
                        <p>member가 된 유저 이름</p>
                        <p>member가 된 유저 이름</p>
                    </div>
                </div>

                <div className={style.applicant_list}>
                    <p className={style.section_title}>스터디 참여 신청자</p>
                    <div> 
                        <Applicant/>
                        <Applicant/>
                        {/* <Applicant username={applicantData.username} message={applicantData.message} /> */}
                    </div>
                </div>

            </div>
        </div>
       
    )
}
//모집 공고글(신지수): 신청자 이름이 

function StudyInfo(props) {
    return(
        <div className={style.study_info_item}>
            <div className={style.study_info_titles}>
                <p>스터디 이름 studyName</p>
                <p>함께 공부할 (교재) material</p>
            </div>
            <div className={style.study_info_contents}>
                <p>duration 스터디 기간</p>
                <p>headcount 모집인원수</p>
                <p>deadline 모집 마감일</p>     
            </div>
            
        </div>
    )
}

function Applicant(props) {
    return(
        <div className={style.section_item}>
            <p className={style.applicant_name}>참여 신청자 applicant</p>
            <p className={style.applicant_message}>참여 신청 메세지 message</p>
            <div className={style.applicant_btns}>
                <button className={style.approve_btn}>승인</button>
                {/* 승인시: applicants 에서 삭제 시키고 study member로 등록  */}
                <button className={style.reject_btn}>거절</button>
                {/* 거절시: applicants 에서 삭제 끝 */}
            </div>
            
        </div>
    )
}