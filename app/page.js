// app/page.js (Server Component)
import { fetchCategories } from './utils/api';
import HomeClient from './components/HomeClient'; // <- move all rendering logic here

export default async function Home() {
  const categories = await fetchCategories();
  return <HomeClient categories={categories} />;
}
