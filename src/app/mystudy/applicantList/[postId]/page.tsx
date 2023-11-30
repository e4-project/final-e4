import { MongoClient } from "mongodb"
import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb"


export default async function ApplicantList(props) {
    let db = (await connectDB).db('e4');
    let applicantData = await db.collection('applicant').findOne({applypostid: props.params.postId});
    let mypost = await db.collection('mystudy').findOne({_id: new ObjectId(props.params.postId) });

    return(
        <div>
            
            <div>스터디 정보:</div>
            <StudyInfo title={mypost.title} material={mypost.material}/>
            
            <div>신청자 목록</div>
            <div> 
                <Applicant username={applicantData.username} message={applicantData.message} />
            </div>
            
        </div>
    )
}

function StudyInfo(props) {
    return(
        <>
            <h3>title: {props.title}</h3>
            <h4>material: {props.material}</h4>
            <p>duration, headcount, deadline 도 표시해주기</p>
        </>
    )
}

function Applicant(props) {
    return(
        <>
          
            <h4>{props.username}</h4>
            <p>{props.message}</p>
            <button>승인</button>
            <button>거절</button>
        </>
    )
}