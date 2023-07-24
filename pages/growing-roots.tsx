/* Personal notes viewing and editing page */

import { ReactNode, useEffect, useRef, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { ChapterType, NoteDataType, Page } from "@/utils/types";
import { useAuth } from "@/auth_context";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import VerseSelector from "@/components/VerseSelector";
import { getText } from "@/utils/orchestration";
import BibleTextDisplay from "@/components/BibleTextDisplay";
import Countdown, { CountdownApi } from "react-countdown";

export default function Notes() {
  // const [hour1, setHour1] = useState<number>(0);
  // const [hour2, setHour2] = useState<number>(0);
  const [minuteTens, setMinuteTens] = useState<number>(3);
  const [minuteOnes, setMinuteOnes] = useState<number>(0);
  const [book, setBook] = useState<string>("Genesis");
  const [chapter, setChapter] = useState<number>(1);
  const [version, setVersion] = useState<string>("NET");
  const [text, setText] = useState<ChapterType>();
  const [sessionComplete, setSessionComplete] = useState<boolean>(false);

  let countdownApi: CountdownApi | null = null;

  // const hour1Ref = useRef<any>();
  // const hour2Ref = useRef<any>();
  const minuteTensRef = useRef<any>();
  const minuteOnesRef = useRef<any>();

  const { loading, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (minuteTensRef.current) {
      minuteTensRef.current.select();
      minuteTensRef.current = undefined;
    }
  });

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  if (loading || !user) {
    return <Loader />;
  }

  const getMilliseconds = (minuteTens: number, minuteOnes: number) => {
    return minuteTens * 10000 * 60 + minuteOnes * 1000 * 60;
  };

  const timerRenderer = ({ minutes, seconds, completed }: any) => {
    if (completed && text) {
      setSessionComplete(true);
      // TODO: send info to backend
    } else {
      return (
        <span>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      );
    }
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const handleStart = async () => {
    setText(await getText(book, chapter, version));
    countdownApi?.start();
  };

  const countdown = (
    <Countdown
      ref={setRef}
      date={Date.now() + getMilliseconds(minuteTens, minuteOnes)}
      renderer={timerRenderer}
      autoStart={false}
    />
  );

  return (
    <PageLayout
      menuBar={
        <MenuBar
          currentPage={Page.GROWING_ROOTS}
          timer={sessionComplete ? undefined : countdown}
        />
      }
    >
      {!text && (
        <div className="bg-gray-100 m-6 p-4 flex flex-col gap-6 py-8 text-center">
          <div className="font-bold text-xl">Growing Roots</div>
          <div className="font-medium text-lg">Set time</div>
          <div className="flex gap-2 items-center justify-center">
            {/* <input
            type="number"
            value={hour1}
            ref={hour1Ref}
            maxLength={1}
            onChange={(e) => {
              const currVal = e.target.value as unknown as number;
              if (!isNaN(currVal))
                if (currVal > 9) {
                  setHour1(9);
                } else {
                  setHour1(currVal);
                }
              else setHour1(0);
              if (`${e.target.value}`.length === 1) {
                hour2Ref.current.select();
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") setHour1(0);
            }}
            className="text-center text-[40px] p-2 w-[45px]"
          />
          <input
            type="number"
            value={hour2}
            ref={hour2Ref}
            maxLength={1}
            onChange={(e) => {
              const currVal = e.target.value as unknown as number;
              if (!isNaN(currVal))
                if (currVal > 9) {
                  setHour2(9);
                } else {
                  setHour2(currVal);
                }
              else setHour2(0);
              if (`${e.target.value}`.length === 1) {
                minute1Ref.current.select();
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") setHour2(0);
            }}
            className="text-center text-[40px] p-2 w-[45px]"
          />
          <div className="text-[40px]">:</div> */}
            <input
              type="number"
              value={minuteTens}
              ref={minuteTensRef}
              maxLength={1}
              onChange={(e) => {
                const currVal = e.target.value as unknown as number;
                if (!isNaN(currVal)) {
                  if (currVal > 9) {
                    setMinuteTens(9);
                  } else {
                    setMinuteTens(currVal);
                  }
                } else {
                  setMinuteTens(0);
                }
                if (`${e.target.value}`.length === 1) {
                  minuteOnesRef.current.select();
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") setMinuteTens(0);
              }}
              className="text-center text-[40px] p-2 w-[45px]"
            />
            <input
              type="number"
              value={minuteOnes}
              ref={minuteOnesRef}
              maxLength={1}
              onChange={(e) => {
                const currVal = e.target.value as unknown as number;
                if (!isNaN(currVal))
                  if (currVal > 9) {
                    setMinuteOnes(9);
                  } else {
                    setMinuteOnes(currVal);
                  }
                else setMinuteOnes(0);
              }}
              onBlur={(e) => {
                if (e.target.value === "") setMinuteOnes(0);
              }}
              className="text-center text-[40px] p-2 w-[45px]"
            />
            <div className="ml-2">minutes</div>
          </div>
          <div className="w-full flex justify-center">
            <VerseSelector
              selectedBook={book}
              selectedChapter={chapter}
              setSelectedBookChapter={(book, chapter) => {
                setBook(book);
                setChapter(chapter);
              }}
              selectedVersion={version}
              setSelectedVersion={setVersion}
            />
          </div>
          <div
            className="bg-white rounded cursor-pointer p-4 text-center"
            onClick={handleStart}
          >
            Start
          </div>
          <div className="font-semibold mt-5">What is Growing Roots?</div>
          <div className="mb-2">
            A habitation/consistency creator that keeps you rooted in the word
            for a certain duration of time.
          </div>
          <div className="font-semibold">How to use Growing Roots</div>
          <div className="mb-2">
            Set a time for your session and dwell in the bible to learn about
            God&apos;s word. If you decide to leave the session, you will not be
            able to obtain new items for your vineyard to grow
          </div>
          <div className="font-semibold">Why Growing Roots?</div>
          <div>
            “But the seed falling on good soil refers to someone who hears the
            word and understands it. This is the one who produces a crop,
            yielding a hundred, sixty or thirty times what was sown.” <br />
            Matthew 13:23
          </div>
        </div>
      )}
      {text && !sessionComplete && <BibleTextDisplay text={text} />}
      {sessionComplete && (
        <div className="bg-gray-100 m-6 p-4 flex flex-col gap-2 py-8 text-center">
          <div className="text-xl font-bold">Congratulations!</div>
          <div>You completed this session.</div>
          <div className="font-semibold mt-6">Today&apos;s growth:</div>
          <div>
            You spent {minuteTens == 0 ? "" : minuteTens}
            {minuteOnes} minute{minuteTens == 0 && minuteOnes == 1 ? "" : "s"}
            &nbsp;growing in {book} {chapter}.
          </div>
          <div className="font-semibold mt-6">Completion rewards:</div>
          <div>TODO</div>
          <div className="mt-6">You can start another session tomorrow!</div>
        </div>
      )}
    </PageLayout>
  );
}
