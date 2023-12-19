import type { NextPage } from 'next';
import { StockForm, useNotif } from '~/components';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const Stocks: NextPage = () => {
  const { opennotification } = useNotif();

  const router = useRouter();
  const barcodeFromQueryUrl = router.query.barcode as string;
  const { data, isLoading: isLoadingquery } = api.inventory.getByBarcode.useQuery({
    barcode: barcodeFromQueryUrl,
  });
  const utils = api.useContext();
  const { mutateAsync, isLoading: isLoadingMutaion } =
    api.inventory.updateInventoryByBarcode.useMutation();
  const { mutateAsync: mutateAction, isLoading: isLoadingAction } =
    api.inventory.updateinventoryByAction.useMutation();

  const onSubmit = async (values: {
    user: string;
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    type: 'FULL_UNIT' | 'PARTIAL_UNIT' | 'PACKS' | 'CONSUMABLE';
    packunit: number;
    unitperpack: number;
  }) => {
    try {
      await mutateAsync({ ...values });
      opennotification('success', 'Update success', 'the upload is succes');
      utils.inventory.getByBarcode.invalidate();
      setTimeout(() => {
        router.push('/stocks');
      }, 3000);
    } catch (error) {
      opennotification('error', 'Update  failed', 'the upload is failed');
    }
  };

  const onUpdateAction = async (values: {
    user: string;
    barcode: string;
    action: string;
    quantity: number;
  }) => {
    try {
      await mutateAction({ ...values });
      opennotification('success', 'Update success', 'the action is succes');
      utils.inventory.getByBarcode.invalidate();
      setTimeout(() => {
        router.push('/stocks');
      }, 3000);
    } catch (error) {
      opennotification('error', 'Action  failed', 'the action is failed');
    }
  };

  return (
    <div className='m-auto w-full sm:w-3/4'>
      <StockForm
        data={data !== null ? data : undefined}
        title='Modify an inventory'
        onSubmit={onSubmit}
        isEditing={true}
        isLoading={isLoadingMutaion || isLoadingquery}
        onChange={undefined}
        onUpdateAction={onUpdateAction}
      />
    </div>
  );
};

export default Stocks;
