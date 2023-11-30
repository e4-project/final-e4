// import { MongoClient } from "mongodb"
// import { connectDB } from "@/util/database.js"
import Link from 'next/link'


export default async function MyStudy() {
    // let db = (await connectDB).db('e4');
    // let mypost = await db.collection('mystudy').find().toArray();

    return(
        <>
            <h1>My Study</h1>

            <div className="apply"> 
                <h2>참여 신청한 스터디</h2>
                                                                {/* 참여신청한 모집글 제목, 승인/거절/확인중 상태표시, 신청취소버튼 */}
                {/* <Apply data={mypost[0].title} />
                <Apply data={mypost[1].title} /> */}
            </div>

            <div className="mypost">
                <h2>내가 작성한 모집글</h2>
                {/* {
                    mypost.map((a, i)=>
                        <div className="mypost-item" key={i}>
                            <h3>{mypost[i].title}</h3>
                            <Link
                                href={'/mystudy/applicantList/' + mypost[i]._id.toString()}>
                                <p>신청차 목록</p>
                            </Link>
                        </div>
                )} */}
 
            </div>

            <div className="studyroom">
                {/* 스터디홈(페이지) 생성된 모임 목록 onClick= 그 스터디홈으로 이동 */}
            </div>

            <div className="likepost">
                {/* 내가 좋아요 누른 모집글 */}
            </div>
        </>
    )
}

function Apply() {
    return(
        <>
            {/* 참여신청한 모집글 데이터 가져오기 */}
            {/* <p>{props.data}</p> */}
            <p>확인 중</p>
            <p> 신청 취소 </p>
            {/* 참여신청한 거 어떻게 됐는지 */}
            {/* <button onClick={}>신청 취소</button> */}
        </>
    )
}