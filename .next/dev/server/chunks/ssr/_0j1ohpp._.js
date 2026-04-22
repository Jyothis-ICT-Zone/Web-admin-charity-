module.exports = [
"[project]/lib/charity-sync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Fired after any charity admin localStorage write (same tab). */ __turbopack_context__.s([
    "CHARITY_DATA_UPDATED_EVENT",
    ()=>CHARITY_DATA_UPDATED_EVENT,
    "CHARITY_STORAGE_KEYS",
    ()=>CHARITY_STORAGE_KEYS,
    "dispatchCharityDataUpdated",
    ()=>dispatchCharityDataUpdated
]);
const CHARITY_DATA_UPDATED_EVENT = "charity-data-updated";
const CHARITY_STORAGE_KEYS = {
    services: "charity-admin-services-v1",
    accounting: "charity-admin-accounting-v1",
    members: "charity-admin-members-v1",
    contact: "charity-admin-contact-v1"
};
function dispatchCharityDataUpdated() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/app/(dashboard)/services/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminServicesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$charity$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/charity-sync.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function cropImageWithArea(source, cropX, cropY, cropSize, onDone) {
    const image = new Image();
    image.onload = ()=>{
        const sx = Math.max(0, Math.min(cropX, image.naturalWidth - cropSize));
        const sy = Math.max(0, Math.min(cropY, image.naturalHeight - cropSize));
        const side = Math.max(1, Math.min(cropSize, image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = side;
        canvas.height = side;
        const context = canvas.getContext("2d");
        if (!context) return;
        context.drawImage(image, sx, sy, side, side, 0, 0, side, side);
        onDone(canvas.toDataURL("image/png"));
    };
    image.src = source;
}
const PREVIEW_SIZE = 360;
const SERVICES_STORAGE_KEY = "charity-admin-services-v1";
const CARDS_PER_PAGE = 10;
const DEFAULT_ITEMS = Array.from({
    length: 10
}, (_, index)=>({
        id: index + 1,
        title: "கல்வி உதவித்தொகை",
        subtitle: "அமரர் சின்னத்துரை அவர்களின் ......",
        description: "அமரர் சின்னத்துரை அவர்களின் நினைவாக கல்வித் திட்டம்: 500+ மாணவர்களுக்கு முழு கல்வி உதவி, மாதாந்திர வழிகாட்டுதல், கணினி ஆய்வகங்கள்.",
        coverImage: "/picture/project.jpg",
        galleryImages: [
            "/picture/view image.png",
            "/picture/view image.png",
            "/picture/view image.png",
            "/picture/view image.png"
        ]
    }));
function AdminServicesPage() {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_ITEMS);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [hasLoadedItems, setHasLoadedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingItemId, setEditingItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedItemId, setSelectedItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAddModalOpen, setIsAddModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addStep, setAddStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isCropModalOpen, setIsCropModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [coverImageRaw, setCoverImageRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [coverImageCropped, setCoverImageCropped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [galleryImages, setGalleryImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [titleValue, setTitleValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [descriptionValue, setDescriptionValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [instagramLink, setInstagramLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [facebookLink, setFacebookLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [youtubeLink, setYoutubeLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSaveConfirmOpen, setIsSaveConfirmOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteItemId, setDeleteItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cropTarget, setCropTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("cover");
    const [coverImageWidth, setCoverImageWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1000);
    const [coverImageHeight, setCoverImageHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1000);
    const [cropX, setCropX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cropY, setCropY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [cropSize, setCropSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(500);
    const [cropMode, setCropMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const coverFileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const galleryFileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        mouseX: 0,
        mouseY: 0,
        cropX: 0,
        cropY: 0,
        cropSize: 0
    });
    const selectedItem = items.find((item)=>item.id === selectedItemId) ?? null;
    const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedItems = items.slice((safeCurrentPage - 1) * CARDS_PER_PAGE, safeCurrentPage * CARDS_PER_PAGE);
    const imageScale = Math.min(PREVIEW_SIZE / coverImageWidth, PREVIEW_SIZE / coverImageHeight);
    const displayWidth = coverImageWidth * imageScale;
    const displayHeight = coverImageHeight * imageScale;
    const offsetX = (PREVIEW_SIZE - displayWidth) / 2;
    const offsetY = (PREVIEW_SIZE - displayHeight) / 2;
    const cropLeft = offsetX + cropX * imageScale;
    const cropTop = offsetY + cropY * imageScale;
    const cropDisplaySize = cropSize * imageScale;
    const openFilePicker = ()=>{
        setCropTarget("cover");
        coverFileInputRef.current?.click();
    };
    const openGalleryPicker = ()=>{
        setCropTarget("gallery");
        galleryFileInputRef.current?.click();
    };
    const onCoverChange = (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            const result = String(fileReader.result);
            setCoverImageRaw(result);
            const probe = new Image();
            probe.onload = ()=>{
                const width = probe.naturalWidth;
                const height = probe.naturalHeight;
                const initialSize = Math.floor(Math.min(width, height) * 0.7);
                setCoverImageWidth(width);
                setCoverImageHeight(height);
                setCropSize(initialSize);
                setCropX(Math.floor((width - initialSize) / 2));
                setCropY(Math.floor((height - initialSize) / 2));
                setIsCropModalOpen(true);
            };
            probe.src = result;
        };
        fileReader.readAsDataURL(file);
        event.target.value = "";
    };
    const onGalleryChange = (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            const result = String(fileReader.result);
            setCoverImageRaw(result);
            setCropTarget("gallery");
            const probe = new Image();
            probe.onload = ()=>{
                const width = probe.naturalWidth;
                const height = probe.naturalHeight;
                const initialSize = Math.floor(Math.min(width, height) * 0.7);
                setCoverImageWidth(width);
                setCoverImageHeight(height);
                setCropSize(initialSize);
                setCropX(Math.floor((width - initialSize) / 2));
                setCropY(Math.floor((height - initialSize) / 2));
                setIsCropModalOpen(true);
            };
            probe.src = result;
        };
        fileReader.readAsDataURL(file);
        event.target.value = "";
    };
    const applyCrop = ()=>{
        if (!coverImageRaw) return;
        cropImageWithArea(coverImageRaw, cropX, cropY, cropSize, (result)=>{
            if (cropTarget === "cover") {
                setCoverImageCropped(result);
            } else {
                setGalleryImages((prev)=>[
                        ...prev,
                        result
                    ]);
            }
            setIsCropModalOpen(false);
        });
    };
    const removeGalleryImage = (indexToRemove)=>{
        setGalleryImages((prev)=>prev.filter((_, index)=>index !== indexToRemove));
    };
    const isStepOneValid = coverImageCropped !== null && titleValue.trim().length > 0 && descriptionValue.trim().length > 0 && galleryImages.length > 0;
    const closeAllAddModals = ()=>{
        setIsSaveConfirmOpen(false);
        setIsAddModalOpen(false);
        setAddStep(1);
    };
    const askDelete = (id)=>{
        setDeleteItemId(id);
    };
    const confirmDelete = ()=>{
        if (deleteItemId === null) return;
        setItems((prev)=>prev.filter((item)=>item.id !== deleteItemId));
        if (selectedItemId === deleteItemId) {
            setSelectedItemId(null);
        }
        if (editingItemId === deleteItemId) {
            resetAddForm();
            closeAllAddModals();
        }
        setDeleteItemId(null);
    };
    const resetAddForm = ()=>{
        setEditingItemId(null);
        setTitleValue("");
        setDescriptionValue("");
        setCoverImageCropped(null);
        setGalleryImages([]);
        setInstagramLink("");
        setFacebookLink("");
        setYoutubeLink("");
        setCoverImageRaw(null);
        setIsCropModalOpen(false);
        setCropMode(null);
    };
    const startEditingItem = (item)=>{
        setSelectedItemId(null);
        setIsSaveConfirmOpen(false);
        setIsCropModalOpen(false);
        setEditingItemId(item.id);
        setTitleValue(item.title);
        setDescriptionValue(item.description);
        setCoverImageCropped(item.coverImage);
        setGalleryImages(item.galleryImages ?? []);
        setInstagramLink(item.instagramLink ?? "");
        setFacebookLink(item.facebookLink ?? "");
        setYoutubeLink(item.youtubeLink ?? "");
        setAddStep(1);
        setIsAddModalOpen(true);
    };
    const handleSaveConfirmed = ()=>{
        const normalizedDescription = descriptionValue.trim();
        const nextItem = {
            id: editingItemId ?? Date.now(),
            title: titleValue.trim(),
            subtitle: `${normalizedDescription.slice(0, 42)}${normalizedDescription.length > 42 ? "..." : ""}`,
            description: normalizedDescription,
            coverImage: coverImageCropped ?? "/picture/project.jpg",
            galleryImages: galleryImages.length > 0 ? galleryImages : [
                "/picture/view image.png"
            ],
            instagramLink: instagramLink.trim(),
            facebookLink: facebookLink.trim(),
            youtubeLink: youtubeLink.trim()
        };
        if (editingItemId !== null) {
            setItems((prev)=>prev.map((item)=>item.id === editingItemId ? nextItem : item));
        } else {
            setItems((prev)=>[
                    ...prev,
                    nextItem
                ]);
            setCurrentPage(Math.ceil((items.length + 1) / CARDS_PER_PAGE));
        }
        closeAllAddModals();
        resetAddForm();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const raw = window.localStorage.getItem(SERVICES_STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                setItems(parsed);
            }
        } catch  {
        // Ignore malformed local storage.
        } finally{
            setHasLoadedItems(true);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasLoadedItems) return;
        try {
            window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(items));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$charity$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dispatchCharityDataUpdated"])();
        } catch  {
        // Ignore storage write failures.
        }
    }, [
        items,
        hasLoadedItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [
        currentPage,
        totalPages
    ]);
    const startCropDrag = (event)=>{
        event.preventDefault();
        setCropMode("drag");
        dragStartRef.current = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            cropX,
            cropY,
            cropSize
        };
    };
    const startCropResize = (event)=>{
        event.preventDefault();
        event.stopPropagation();
        setCropMode("resize");
        dragStartRef.current = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            cropX,
            cropY,
            cropSize
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isCropModalOpen || !cropMode) return;
        const onMouseMove = (event)=>{
            const deltaX = (event.clientX - dragStartRef.current.mouseX) / imageScale;
            const deltaY = (event.clientY - dragStartRef.current.mouseY) / imageScale;
            if (cropMode === "drag") {
                const nextX = Math.round(dragStartRef.current.cropX + deltaX);
                const nextY = Math.round(dragStartRef.current.cropY + deltaY);
                const maxX = Math.max(0, coverImageWidth - cropSize);
                const maxY = Math.max(0, coverImageHeight - cropSize);
                setCropX(Math.max(0, Math.min(nextX, maxX)));
                setCropY(Math.max(0, Math.min(nextY, maxY)));
                return;
            }
            const resizeDelta = Math.max(deltaX, deltaY);
            const minSize = 80;
            const maxSize = Math.min(coverImageWidth - dragStartRef.current.cropX, coverImageHeight - dragStartRef.current.cropY);
            const nextSize = Math.round(dragStartRef.current.cropSize + resizeDelta);
            setCropSize(Math.max(minSize, Math.min(nextSize, maxSize)));
        };
        const onMouseUp = ()=>{
            setCropMode(null);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return ()=>{
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [
        cropMode,
        isCropModalOpen,
        imageScale,
        coverImageWidth,
        coverImageHeight,
        cropSize
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[40px] flex-1 items-center rounded-full border border-[#23712780] bg-transparent px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/picture/search.svg",
                                        alt: "",
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search",
                                        className: "ml-2 w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setSelectedItemId(null);
                                    setIsCropModalOpen(false);
                                    setEditingItemId(null);
                                    setAddStep(1);
                                    setIsAddModalOpen(true);
                                },
                                className: "h-[40px] rounded-full bg-[#268257] px-5 text-sm font-medium text-white",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5",
                        children: paginatedItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                onClick: ()=>{
                                    setIsAddModalOpen(false);
                                    setIsCropModalOpen(false);
                                    setSelectedItemId(item.id);
                                },
                                className: "mx-auto h-[231px] w-full max-w-[260px] cursor-pointer overflow-hidden rounded-[24px] border border-zinc-300 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.08)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.coverImage,
                                        alt: item.title,
                                        className: "h-[132px] w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "w-[174px] truncate text-[17px] font-semibold leading-[17px] text-[#1f4f2c]",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "w-[240px] truncate text-[15px] leading-[15px] text-[#2E835E]",
                                                children: item.subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 pt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (event)=>{
                                                            event.stopPropagation();
                                                            startEditingItem(item);
                                                        },
                                                        className: "flex h-[28px] w-[196px] items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[16px] font-medium leading-none text-[#2E835E]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "/picture/edit.svg",
                                                                alt: "",
                                                                className: "h-[14px] w-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Edit"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (event)=>{
                                                            event.stopPropagation();
                                                            askDelete(item.id);
                                                        },
                                                        className: "grid h-[28px] w-[38px] place-items-center rounded-[10px] border border-red-400 bg-[#F9F5F0]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: "/picture/delete.svg",
                                                            alt: "Delete",
                                                            className: "h-[16px] w-[16px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-2 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCurrentPage((prev)=>Math.max(1, prev - 1)),
                                disabled: safeCurrentPage === 1,
                                className: "grid h-8 w-8 place-items-center rounded-md bg-white text-zinc-600 disabled:opacity-40",
                                children: "‹"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            Array.from({
                                length: totalPages
                            }, (_, index)=>{
                                const pageNumber = index + 1;
                                const active = pageNumber === safeCurrentPage;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCurrentPage(pageNumber),
                                    className: `h-8 rounded-md px-4 text-sm ${active ? "bg-[#268257] font-medium text-white" : "bg-white text-zinc-700"}`,
                                    children: pageNumber
                                }, pageNumber, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCurrentPage((prev)=>Math.min(totalPages, prev + 1)),
                                disabled: safeCurrentPage === totalPages,
                                className: "grid h-8 w-8 place-items-center rounded-md bg-white text-zinc-600 disabled:opacity-40",
                                children: "›"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            isAddModalOpen && !isCropModalOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4",
                onClick: ()=>{
                    closeAllAddModals();
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full rounded-[22px] bg-white px-6 py-5 shadow-2xl ${addStep === 2 ? "h-[458px] max-w-[610px] overflow-hidden" : "h-[690px] max-w-[620px] overflow-y-auto"}`,
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full max-w-[430px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-zinc-600",
                                            children: [
                                                "Step ",
                                                addStep,
                                                " of 2"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 505,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1 h-1.5 rounded-full bg-zinc-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-1.5 rounded-full bg-[#268257] ${addStep === 1 ? "w-1/2" : "w-full"}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                lineNumber: 507,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 506,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        closeAllAddModals();
                                    },
                                    className: "grid h-7 w-7 place-items-center rounded-lg bg-[#f5f5f5] text-lg leading-none text-[#1f4f2c]",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 510,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 503,
                            columnNumber: 13
                        }, this),
                        addStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[24px] font-semibold leading-[24px] text-[#1f4f2c]",
                                    children: editingItemId !== null ? "Edit" : "Add"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 523,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[13px] text-zinc-700",
                                    children: "Cover Image (crop & edit available)"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: coverFileInputRef,
                                    type: "file",
                                    accept: "image/*",
                                    onChange: onCoverChange,
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: galleryFileInputRef,
                                    type: "file",
                                    accept: "image/*",
                                    onChange: onGalleryChange,
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: openFilePicker,
                                    className: "mt-1.5 flex h-[44px] w-full items-center justify-center rounded-full border border-dashed border-[#23712780] text-[13px] text-zinc-500",
                                    children: "Upload cover image here"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 542,
                                    columnNumber: 17
                                }, this),
                                coverImageCropped ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1.5 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: coverImageCropped,
                                            alt: "Cover",
                                            className: "h-[54px] w-[54px] rounded-lg object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: openFilePicker,
                                            className: "flex h-[22px] items-center justify-center gap-1 rounded-[8px] border border-[#2E835E] bg-[#F9F5F0] px-3 text-[11px] text-[#2E835E]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/picture/edit.svg",
                                                    alt: "",
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 19
                                                }, this),
                                                "Edit"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 553,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setCoverImageCropped(null),
                                            className: "grid h-[22px] w-[22px] place-items-center rounded-[8px] border border-red-400 bg-[#F9F5F0]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/picture/delete.svg",
                                                alt: "Delete cover",
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                lineNumber: 568,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 block text-[13px] text-zinc-800",
                                    children: "Title"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 573,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: titleValue,
                                    onChange: (event)=>setTitleValue(event.target.value),
                                    placeholder: "Type here....",
                                    className: "mt-1 h-[38px] w-full rounded-full border border-[#23712780] px-4 text-[13px] text-zinc-700 outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 574,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 block text-[13px] text-zinc-800",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 582,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: descriptionValue,
                                    onChange: (event)=>setDescriptionValue(event.target.value),
                                    placeholder: "Type here...",
                                    rows: 3,
                                    className: "mt-1 w-full rounded-[16px] border border-[#23712780] px-4 py-2.5 text-[13px] text-zinc-700 outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 583,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-[13px] text-zinc-800",
                                    children: "Gallery Images (multiple, edit/delete each)"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 591,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: openGalleryPicker,
                                    className: "mt-1.5 flex h-[44px] w-full items-center justify-center rounded-full border border-dashed border-[#23712780] text-[13px] text-zinc-500",
                                    children: "Add gallery image here"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 592,
                                    columnNumber: 17
                                }, this),
                                galleryImages.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1.5 flex flex-wrap gap-2",
                                    children: galleryImages.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: image,
                                                    alt: `Gallery ${index + 1}`,
                                                    className: "h-[54px] w-[54px] rounded-lg object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                    lineNumber: 605,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>removeGalleryImage(index),
                                                    className: "absolute -right-1 -top-1 grid h-[13px] w-[13px] place-items-center rounded-full bg-red-500 text-[9px] leading-none text-white",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, `${image}-${index}`, true, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 603,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 601,
                                    columnNumber: 19
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: !isStepOneValid,
                                    onClick: ()=>setAddStep(2),
                                    className: `mt-4 h-[38px] w-full rounded-full text-[14px] font-medium text-white ${isStepOneValid ? "bg-[#268257]" : "cursor-not-allowed bg-zinc-300"}`,
                                    children: "Next"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 618,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, "add-step-1", true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 522,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[33px] font-semibold leading-none text-[#1f4f2c]",
                                    children: "Social media links"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 631,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 block text-[11px] font-medium text-zinc-800",
                                    children: "Instagram links"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 633,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: instagramLink,
                                    onChange: (event)=>setInstagramLink(event.target.value),
                                    placeholder: "Add link here",
                                    className: "mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 634,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 block text-[11px] font-medium text-zinc-800",
                                    children: "Facebook links"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 642,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: facebookLink,
                                    onChange: (event)=>setFacebookLink(event.target.value),
                                    placeholder: "Add link here",
                                    className: "mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 643,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "mt-3 block text-[11px] font-medium text-zinc-800",
                                    children: "YouTube links"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 651,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: youtubeLink,
                                    onChange: (event)=>setYoutubeLink(event.target.value),
                                    placeholder: "Add link here",
                                    className: "mt-1 h-[30px] w-full rounded-full border border-[#23712780] px-4 text-[11px] text-zinc-700 outline-none placeholder:text-[11px]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 652,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setAddStep(1),
                                            className: "h-[31px] flex-1 rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-600",
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 661,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsSaveConfirmOpen(true),
                                            className: "h-[31px] flex-1 rounded-full bg-[#268257] text-[11px] font-medium text-white",
                                            children: "Save"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 668,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 660,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, "add-step-2", true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 630,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                    lineNumber: 495,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 489,
                columnNumber: 9
            }, this) : null,
            isSaveConfirmOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[228px] w-[458px] rounded-[30px] bg-white px-8 py-6 text-center opacity-100 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto grid h-[64px] w-[64px] place-items-center rounded-full bg-[#268257] text-[40px] text-white",
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 685,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[378px] text-[17px] leading-[1.2] text-[#1f4f2c]",
                            children: "Confirm save. This action will permanently update the record."
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 688,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto mt-5 flex w-[378px] items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setIsSaveConfirmOpen(false),
                                    className: "h-[48px] w-[180px] rounded-full bg-zinc-100 text-[15px] font-medium leading-[15px] text-[#1f4f2c]",
                                    children: "No"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 692,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleSaveConfirmed,
                                    className: "h-[48px] w-[180px] rounded-full bg-[#268257] text-[15px] font-medium leading-[15px] text-white",
                                    children: "Yes"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 699,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 691,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                    lineNumber: 684,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 683,
                columnNumber: 9
            }, this) : null,
            deleteItemId !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[75] flex items-center justify-center bg-black/55 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-[520px] rounded-[22px] bg-white px-8 py-7 text-center shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto grid h-[64px] w-[64px] place-items-center rounded-full text-[36px] text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/picture/delete-form.svg",
                                alt: "Delete",
                                className: "h-[53px] w-[53px]"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/services/page.tsx",
                                lineNumber: 716,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 714,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-4 max-w-[380px] text-[16px] leading-[1.35] text-[#1f4f2c]",
                            children: "This will permanently delete the item. You can't recover it later."
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 718,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto mt-5 flex w-full max-w-[360px] items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setDeleteItemId(null),
                                    className: "h-[40px] w-[170px] rounded-full bg-zinc-100 text-[13px] font-medium text-[#1f4f2c]",
                                    children: "No"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: confirmDelete,
                                    className: "h-[40px] w-[170px] rounded-full bg-red-500 text-[13px] font-medium text-white",
                                    children: "Yes"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 721,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                    lineNumber: 713,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 712,
                columnNumber: 9
            }, this) : null,
            isCropModalOpen && coverImageRaw ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-[620px] rounded-[22px] bg-white p-6 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[14px] text-[#1f4f2c]",
                                    children: cropTarget === "cover" ? "Crop cover image" : "Crop gallery image"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 745,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setIsCropModalOpen(false),
                                    className: "grid h-8 w-8 place-items-center rounded-xl bg-[#f5f5f5] text-xl leading-none text-[#1f4f2c]",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 744,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mx-auto h-[360px] w-[360px] overflow-hidden rounded-[24px] bg-[linear-gradient(45deg,#d8d8d8_25%,#bdbdbd_25%,#bdbdbd_50%,#d8d8d8_50%,#d8d8d8_75%,#bdbdbd_75%,#bdbdbd_100%)] bg-[length:28px_28px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: coverImageRaw,
                                    alt: "Crop preview",
                                    className: "h-full w-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 759,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute border-2 border-blue-500/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]",
                                    style: {
                                        left: `${cropLeft}px`,
                                        top: `${cropTop}px`,
                                        width: `${cropDisplaySize}px`,
                                        height: `${cropDisplaySize}px`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 764,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute border-2 border-blue-500/90",
                                    style: {
                                        left: `${cropLeft}px`,
                                        top: `${cropTop}px`,
                                        width: `${cropDisplaySize}px`,
                                        height: `${cropDisplaySize}px`,
                                        cursor: "move"
                                    },
                                    onMouseDown: startCropDrag,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onMouseDown: startCropResize,
                                        className: "absolute -bottom-2 -right-2 h-4 w-4 rounded-sm border border-white bg-blue-500",
                                        "aria-label": "Resize crop"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 784,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 773,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 757,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: applyCrop,
                            className: "mt-4 h-[42px] w-full rounded-full bg-[#268257] text-[16px] font-medium text-white",
                            children: "Apply crop"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 793,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                    lineNumber: 743,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 742,
                columnNumber: 9
            }, this) : null,
            selectedItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4",
                onClick: ()=>setSelectedItemId(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[659px] w-full max-w-[660px] overflow-hidden rounded-[34px] bg-white px-7 py-7 shadow-2xl",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "whitespace-nowrap pt-1 text-[16px] font-semibold leading-none text-[#1f4f2c]",
                                    children: selectedItem.title
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 814,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedItemId(null),
                                    className: "grid h-[42px] w-[42px] place-items-center rounded-xl bg-[#f5f5f5] text-[34px] leading-none text-[#1f4f2c]",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 817,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 813,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedItem.coverImage,
                            alt: selectedItem.title,
                            className: "h-[217px] w-[580px] rounded-[24px] object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 827,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 h-[136px] w-[580px] overflow-hidden text-[12.5px] leading-[1.45] text-[#2E835E]",
                            children: selectedItem.description
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 833,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex h-[99px] w-[498px] gap-[10px]",
                            children: selectedItem.galleryImages.slice(0, 4).map((image, index)=>// eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: image,
                                    alt: "",
                                    className: "h-[99px] w-[117px] rounded-[16px] object-cover"
                                }, index, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 840,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 837,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex h-[28px] w-[580px] items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>startEditingItem(selectedItem),
                                    className: "flex h-[28px] flex-1 items-center justify-center gap-2 rounded-full border border-[#2E835E] bg-[#F9F5F0] text-[20px] font-medium leading-none text-[#2E835E]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/picture/edit.svg",
                                            alt: "",
                                            className: "h-[14px] w-[14px]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                                            lineNumber: 856,
                                            columnNumber: 17
                                        }, this),
                                        "Edit"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 850,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>askDelete(selectedItem.id),
                                    className: "grid h-[28px] w-[82px] place-items-center rounded-[10px] border border-red-400 bg-[#F9F5F0]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/picture/delete.svg",
                                        alt: "Delete",
                                        className: "h-[14px] w-[14px]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/services/page.tsx",
                                        lineNumber: 865,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                                    lineNumber: 859,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/services/page.tsx",
                            lineNumber: 849,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/services/page.tsx",
                    lineNumber: 809,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/services/page.tsx",
                lineNumber: 805,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_0j1ohpp._.js.map