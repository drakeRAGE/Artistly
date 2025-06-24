// app/dashboard/page.js
'use client'

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { fetchSubmissions } from '../utils/api';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions().then(setSubmissions);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
      {submissions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.category}</TableCell>
                <TableCell>{submission.city}</TableCell>
                <TableCell>{submission.fee}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => console.log('View details:', submission.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No submissions found.</p>
      )}
    </motion.div>
  );
}
