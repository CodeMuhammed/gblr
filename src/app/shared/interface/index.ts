export interface IObjectMap<T> {
    [key: string]: T;
}

export interface IModifierTime {
    value: string;
    utcOffset: number;
}

export interface IEmailOption {
    to: string;             // receiver's email
    from?: string;          // sender's email
    bodySubject: string;    // email subject (like title)
    bodyText?: string;      // the main text in the body of email
    schoolName?: string;    // name of school
    actionHtml?: string;    // html-containing text. can contain actions, styled info/texts
    infoText?: string;      // translated text like disclaimer etc
}

export interface IUploadTaskResult {
    percent: number;               // current file bytes upload percent
    completed?: boolean;            // is upload completed?
    downloadUrl?: string;            // if upload is completed
    numberOfFiles: number;          // total number of files being upload
    currentFilePosition: number;    // current position of file being uploaded eg, 2 when number of files might be 5
}

export interface ISearchIndex {
    properties: string[];
    index: IObjectMap<boolean>;
}

export interface IGroupLabel {
    name: string;
    level: string;
}

export interface IDocumentLog {
    createdAt: Date;
    updatedAt: Date;
}
