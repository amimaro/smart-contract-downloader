import JSZip from "jszip";
import { saveAs } from "file-saver";

export const exportContractContentsToZip = (
  contractContents: any,
  contractAddress: string
) => {
  var zip = new JSZip();
  for (const contractContent of contractContents) {
    zip.file(contractContent.path, contractContent.content);
  }
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `contract_${contractAddress}.zip`);
  });
};
