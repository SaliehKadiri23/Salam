import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import Button from '../../utility/Button';

const ModalFooter = ({ onCancel, onSave, loading, hasChanges }) => {
  return (
    <div className="border-t border-gray-200 p-6 bg-gray-50/50 rounded-b-2xl">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {hasChanges ? (
            <span className="text-amber-600 font-medium">• You have unsaved changes</span>
          ) : (
            <span>All changes saved</span>
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
                <Save className="w-4 h-4" />
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