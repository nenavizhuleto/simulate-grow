import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  isConnected: boolean;
  isConnecting: boolean;
}

export const ConnectionStatus = ({ isConnected, isConnecting }: ConnectionStatusProps) => {
  if (isConnecting) {
    return (
      <Badge variant="secondary" className="gap-2">
        <Loader2 className="h-3 w-3 animate-spin" />
        Connecting...
      </Badge>
    );
  }

  if (isConnected) {
    return (
      <Badge className="gap-2 bg-gradient-success border-0">
        <Wifi className="h-3 w-3" />
        Connected
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className="gap-2">
      <WifiOff className="h-3 w-3" />
      Disconnected
    </Badge>
  );
};