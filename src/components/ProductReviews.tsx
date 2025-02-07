"use client";

import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  initialReviews: Review[];
}

export default function ProductReviews({
  productId,
  initialReviews,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`/api/reviews?productId=${productId}`);
      setReviews(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      } else {
        console.error("An unknown error occurred:", err);
        setError("An unknown error occurred while fetching reviews.");
      }
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/reviews", {
        productId,
        ...newReview,
      });

      setNewReview({ name: "", rating: 5, comment: "" });
      await fetchReviews();
      alert("Review submitted successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error submitting review:", error);
        setError(error.response?.data?.error ?? error.message);
        alert(error.response?.data?.error ?? error.message);
      } else {
        console.error("An unknown error occurred:", error);
        setError("An unknown error occurred while submitting review.");
        alert("An unknown error occurred while submitting review.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Review</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-black hover:bg-gray-800 text-white"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review._id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{review.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
