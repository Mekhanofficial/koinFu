import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function SecuritySection() {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Security Info</h3>
        <p>Login logs, KYC approvals, and suspicious users will appear here.</p>
      </CardContent>
    </Card>
  );
}
