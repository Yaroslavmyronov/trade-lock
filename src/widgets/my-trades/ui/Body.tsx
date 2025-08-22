import { History } from './History';
import { Incoming } from './Incoming';
import { Sent } from './Sent';

interface BodyProps {
  activeTab: 'Incoming' | 'Sent' | 'History';
}

export const Body = ({ activeTab }: BodyProps) => {
  return (
    <div className="size-full overflow-auto">
      {activeTab === 'Incoming' && <Incoming />}
      {activeTab === 'Sent' && <Sent />}
      {activeTab === 'History' && <History />}
    </div>
  );
};
