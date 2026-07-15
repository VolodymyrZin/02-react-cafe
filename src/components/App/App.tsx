import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import Notification from '../Notification/Notification';
import VoteStats from '../VoteStats/VoteStats';
import type { Votes, VoteType } from '../../types/votes';
import { useState } from 'react';
const INITIAL_VOTES: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};
export default function App(): React.JSX.Element {
  const [votes, setVotes] = useState<Votes>(INITIAL_VOTES);
  function handleVote(feedbackType: VoteType): void {
    setVotes(prev => ({ ...prev, [feedbackType]: prev[feedbackType] + 1 }));
  }
  function resetVotes() {
    setVotes(INITIAL_VOTES);
  }
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
