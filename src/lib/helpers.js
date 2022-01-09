import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const getContractSourceCode = async (apiKey, contractAddress) => {
  return await axios.get(
    `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`
  );
};

export const parseSourceCodeObject = (sourceCode) => {
  return JSON.parse(sourceCode.substr(1, sourceCode.length - 2));
};

export const exportContractContentToZip = (sourceCodes, contractAddress) => {
  var zip = new JSZip();
  for (const sourceCode of sourceCodes) {
    const parsedSourceCode = parseSourceCodeObject(sourceCode.SourceCode);
    for (const [fileName, contentObj] of Object.entries(
      parsedSourceCode.sources
    )) {
      zip.file(fileName, contentObj.content);
    }
  }
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `contract_${contractAddress}.zip`);
  });
};
