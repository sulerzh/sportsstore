// JavaScript source code
// ����facebookͼƬ�洢

!function () {
    Slingshot.fileRestrictions("mealPhotoUpload", {
        allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
        maxSize: 10485760
    }),
    Slingshot.fileRestrictions("dishPhotoUpload", {
        allowedFileTypes: ["image/png", "image/jpeg", "image/gif"], maxSize: 10485760
    }),
    Slingshot.fileRestrictions("profilePhotoUpload", {
        allowedFileTypes: ["image/png", "image/jpeg", "image/gif"], maxSize: 10485760
    })
}();
