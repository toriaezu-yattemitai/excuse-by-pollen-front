'use client';

import Button from "@/components/ui/common/Button";

export default function TopButton() {
  return (
    <Button color="orange" onClick={
        () => {
        window.location.href = '/';
        }
    }>自分も生成してみる</Button>
  );
}