import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import Button from '../../utility/Button';

const ModalFooter = ({ onCancel, onSave, loading, hasChanges }) => {
  return (
    <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-islamic-500 to-islamic-600 dark:from-islamic-700 dark:to-islamic-800 rounded-b-2xl">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {hasChanges ? (
            <span className="text-amber-600 dark:text-gray-100 font-medium">
              • You have unsaved changes
            </span>
          ) : (
            <span className="dark:text-gray-100">All changes saved</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onCancel}
            variant="secondary"
            size="md"
            disabled={loading}
            className="min-w-[100px]"
          >
            Cancel
          </Button>

          <Button
            onClick={onSave}
            variant="primary"
            size="md"
            disabled={!hasChanges || loading}
            className="min-w-[120px] relative"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-9" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;