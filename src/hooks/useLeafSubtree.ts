import { useEffect } from 'react';

import { PhylogenyTree } from '../types/phylogeny-tree';
import { setRootNLevelsUp } from '../utils';

type SubtreeLeafOption = {
  leafSubtree: {
    leafID?: string;
    noLevels?: number;
    minLeafToRootLength?: number;
    setLeafLabels?: (ids: (string | number)[]) => void;
  };
};

export function useLeafSubtree(
  getTree: () => PhylogenyTree | null,
  { leafSubtree: { leafID, noLevels, minLeafToRootLength, setLeafLabels } }: SubtreeLeafOption
) {
  useEffect(() => {
    const tree = getTree();
    if (tree && leafID) {
      setRootNLevelsUp(tree, leafID, noLevels, minLeafToRootLength);
      const ids = tree.nodes.leafNodes.map((value) => value.id);
      if (setLeafLabels) setLeafLabels(ids);
    }
  }, [leafID, noLevels, minLeafToRootLength, setLeafLabels, getTree]);
}
