const path = require('path');
const { config: { getConfig }} = require('@jmcmahon1999/convver');
const { read, createEditor } = require('properties-parser');

module.exports = {
  name: "gradle",
  description: "plugin for gradle projects",
  file: "gradle.properties",
  async read() {
    const data = read(path.join(process.cwd(), this.file));
    if (data) {
        return data;
    } else {
        return;
    }
  },
  async version() {
    const project = await this.read();
    const field = getConfig()["version-field"] || "version";
    return project[field];
  },
  async update(version) {
    const filePath = path.join(process.cwd(), this.file)
    const editor = createEditor(filePath);
    const field = getConfig()["version-field"] || "version";
    editor.set(field, version);
    editor.save()
  },
};
