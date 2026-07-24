import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import ReviewCard from '../../components/cards/ReviewCard';
import Button from '../../components/ui/Button';
import { moderateReview, removeReview, selectReviews } from '../../store/slices/reviewSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminReviews() {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Review moderation" description="Approve, hide, or remove community reviews." />
      <div className="mx-auto max-w-3xl space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="space-y-2">
            <ReviewCard review={review} />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  dispatch(moderateReview({ id: review._id, status: 'approved' }));
                  toast.success('Review approved');
                }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  dispatch(moderateReview({ id: review._id, status: 'hidden' }));
                  toast.warning('Review hidden');
                }}
              >
                Hide
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  dispatch(removeReview(review._id));
                  toast.success('Review removed');
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
