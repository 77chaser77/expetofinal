import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'
import { useRouter } from 'next/router';

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>분실 신고</title>
      </Head>
      <div className="container1">
                <header className="Header"></header>
                <div className="logo">
                    <p>분실 신고</p>
                </div>
                <form>
                    <p className="dateP"><strong>날짜</strong></p>
                    <div className="inputBox">
                        <input className="date" type="text" placeholder="날짜" required></input>
                    </div>
                    <p className="locP"><strong>장소</strong></p>
                    <div className="inputBox">
                        <input className="loc" type="text" placeholder="장소" required></input>
                    </div>
                    <p className="etcP"><strong>특이사항</strong></p>
                    <div className="inputBox">
                        <textarea className="etc" cols={32} rows={8}></textarea>
                    </div>
                    <input className="Button" type="submit" value="신고" onClick={() => confirm('분실 신고 하시겠습니까?')}></input>
                    <input className="Button2" type="button" value="홈으로" onClick={()=>router.push('/posts/main')}></input>
                </form>
            </div>

      <style jsx>{`
       .container1{
        margin:0 auto;  /* 화면 중앙에 배치 */
        width:1200px;    /* 너비 */    
        background-color: #fff;
    }
    .Header{
        background-color: green;
        height:50px;   /* 높이 */
    }
    .logo{
        margin-top:70px;
    }
    .logo p{
        font-size: 45px;
        text-align: center;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
    .inputBox{
        margin-top: 10px;
        text-align: center;
    }
    .dateP, .locP, .etcP{
        font-size: 15px;
        margin-top: 30px;
        color:#666;
        font-weight: 30px;
        padding-left: 430px;
    }
    .date, .loc{
        border-radius: 10px;
        font-size: 15px;
        padding: 15px;
        width: 350px;
        height: 40px;
        border: 3px black solid;
    }
    .etc{
        border-radius: 10px;
        border: 3px black solid;
        font-size: 20px;
    }
    .date:focus, .loc:focus, .etc:focus{
        border-color: blue;
        outline: none;
    }
    .Button{
      width:100px;
      height:50px;
      font-size:20px;
      background-color:green;
      border-color:green;
      border-radius: 15px;
      color: white;
      margin-top: 40px;
      margin-bottom: 50px;
      margin-left: 495px;
  }
  .Button2{
    width:100px;
    height:50px;
    font-size:20px;
    background-color:green;
    border-color:green;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 10px;
}
@media screen and (max-width:1080px){
  .container1{
    margin:0 auto;  /* 화면 중앙에 배치 */
    width:600px;    /* 너비 */    
    background-color: #fff;
  }
  .Button{
    width:100px;
    height:50px;
    font-size:20px;
    background-color:green;
    border-color:green;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 190px;
  }
  .dateP, .locP, .etcP{
    font-size: 15px;
        margin-top: 30px;
        color:#666;
        font-weight: 30px;
        padding-left: 130px;
  }
}
@media screen and (max-width:720px){
  .container1{
    margin:0 auto;  /* 화면 중앙에 배치 */
    width:500px;    /* 너비 */    
    background-color: #fff;
  }
  .Button{
    width:100px;
    height:50px;
    font-size:20px;
    background-color:green;
    border-color:green;
    border-radius: 15px;
    color: white;
    margin-top: 40px;
    margin-bottom: 50px;
    margin-left: 140px;
  }
  .dateP, .locP, .etcP{
    font-size: 15px;
      margin-top: 30px;
      color:#666;
      font-weight: 30px;
      padding-left: 80px;
  }
}
      `}</style>

  <style jsx global>{`
        html,
        body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

        * {
        margin:0;   /* 마진 리셋 */
        padding:0;   /* 패딩 리셋 */
        box-sizing: border-box;   /* 박스 영역은 테두리까지 */ 
        }
      `}</style>
    </div>
  )
}
