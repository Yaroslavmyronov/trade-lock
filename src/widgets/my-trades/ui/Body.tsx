import { Incoming } from './Incoming';
import { Sent } from './Sent';

interface BodyProps {
  activeTab: 'Incoming' | 'Sent';
}

export const Body = ({ activeTab }: BodyProps) => {
  return (
    <div className="size-full overflow-auto">
      {activeTab === 'Incoming' && <Incoming />}
      {activeTab === 'Sent' && <Sent />}
    </div>
  );
};
