'use client' // 👈 use it here

import Footer from '@/components/component/footer';
import { Randomdict } from '../components/component/randomdict';

export default function Home() {
  return (
    <>
    <Randomdict />
    <Footer />
    </>
  );
}
