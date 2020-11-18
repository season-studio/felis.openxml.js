import { readonly, error, genRandId } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart } from "../../basic";
import { presentation as presentationSchemas, office as officeSchemas }  from "../../schemas";
import path from "path";

const assert = error.assert;

//#region inner class

//#region class of SlideSet
const $slideAvalidID = Symbol("SlideSet.avalidID");
/**
 * Class of operating the set of the slides
 */
class SlideSet {
    /**
     * the minimum ID
     */
    static MIN_ID = 256;
    /**
     * the maximum ID
     */
    static MAX_ID = 0x0ffffffff;

    /**
     * constructor
     * @param {Presentation} _presentation the presentation part
     */
    constructor (_parent) {
        assert(_parent instanceof PresentationPart, "_parent(an instance of PresentationPart)");
        
        readonly(this, "selfElement", _parent.presentation.slideIdList);
        readonly(this, "parent", _parent);
        this.arrangeId();
    }

    /**
     * arrange the id of all slides
     * the new set of id will start from MIN_ID
     */
    arrangeId() {
        const rootNode = this.parent.contentDom.documentElement;
        let id = SlideSet.MIN_ID;
        for (let { slideId } of this.selfElement.items()) {
            const oriId = slideId.id;
            const relElements = rootNode.xpathSelect(`.//*[local-name(.)='sldId' and @id='${oriId}']`);
            for (let relIdx in relElements) {
                relElements[relIdx].setAttribute("id", id);
            }
            id++;
        }
        this[$slideAvalidID] = id;
    }

    /**
     * the count of the slides
     */
    get count() {
        return this.selfElement.count;
    }

    /**
     * get a slide by the index in the slide set
     * @param {Number} _index the index of the slide in the slide set
     */
    getByIndex(_index) {
        const sldIdNode = this.selfElement.children(presentationSchemas.SlideId)[_index];
        if (sldIdNode) {
            return this.parent.getRelationPart(sldIdNode.relationshipId);
        }
    }

    /**
     * get an iterator of all slides
     */
    * slides() {
        const parent = this.parent;
        for (let { index, slideId } of this.selfElement.items()) {
            yield {
                index,
                getter: parent.getRelationPart(slideId.relationshipId),
                id: slideId.id
            };
        }
    }

    /**
     * enumerate each slide and pass to the callback function to process
     * @param {Function} _cb the callback function
     */
    async each(_cb) {
        if (typeof _cb === "function") {
            const parent = this.parent;
            for (let { index, slideId } of this.selfElement.items()) {
                const slidePart = await parent.getRelationPart(slideId.relationshipId);
                const cbRet = _cb(index, slidePart);
                (cbRet instanceof Promise) && await cbRet;
            }
        }
    }

    /**
     * insert a slide
     * @param {*} _positionSlide    表示插入位置的胶片，新胶片将插入到此胶片之后，可以是胶片顺序号、胶片关系ID、胶片部件
     *                              如果输入的是undefined，则将新胶片添加到最后
     *                              如果输入的是-1，则表示将新胶片添加到第一张
     * @param {*} _targetSlide      新胶片的部件，如果不输入该参数，则复制_positionSlide表示的胶片为新胶片
     */
    async insert(_positionSlide, _targetSlide) {
        const parent = this.parent;

        // get a valid id for new slide.
        // if there is no valid id, try once after arranging.
        let useId = this[$slideAvalidID];
        if (useId > SlideSet.MAX_ID) {
            this.arrangeId();
            useId = this[$slideAvalidID];
        }
        assert(useId <= SlideSet.MAX_ID, error.NO_ENOUGH_ID);

        // check the new slide must be in the same package of the slide set
        assert((!_targetSlide) || parent.inSamePackage(_targetSlide), error.FROM_OTHER_PACKAGE("_targetSlide"));

        // looking for the relationship ID of the position slide
        let relSlideId = undefined;
        if (typeof _positionSlide === "number") {
            const slideIdSet = this.selfElement.children(presentationSchemas.SlideId);
            relSlideId = slideIdSet[_positionSlide < 0 ? 0 : (_positionSlide >= slideIdSet.length ? (slideIdSet.length - 1) : _positionSlide)];
        } else if (typeof _positionSlide === "string") {
            relSlideId = this.selfElement.childOne(officeSchemas.AttrRelationshipId, `and string(.)='${_positionSlide}'`);
        } else if (parent.inSamePackage(_positionSlide)) {
            relSlideId = this.selfElement.childOne(officeSchemas.AttrRelationshipId, `and string(.)='${_positionSlide.relationID}'`);
        }

        if (!_targetSlide) {
            if (relSlideId) {
                // if the target slide is unspecified, duplicate the position slide as a new one
                const refSlidePart = await parent.getRelationPart(relSlideId.relationshipId);
                const fileExtName = path.extname(refSlidePart.path);
                const fileName = path.basename(refSlidePart.path, fileExtName).replace(/\d$/, "") + genRandId() + fileExtName;
                const filePath = path.dirname(refSlidePart.path);
                _targetSlide = await refSlidePart.duplicate(path.join(filePath, fileName));
            } else {
                // if both the target slide and position slide are unspecified, create an empty slide
                // TODO: this is no implementation.
                throw error.NO_IMPLEMENT();
            }
        }
        assert(_targetSlide, error.LOCATE_RESOURCE_FAIL("target slide part"));

        // insert the target slide
        const rid = parent.insertRelationPart(_targetSlide);
        const newId = this.selfElement.createElement(presentationSchemas.SlideId);
        assert(newId, error.ACQUIRE_RESOURCE_FAIL("SlideId Node"));
        newId.id = useId;
        newId.relationshipId = rid;
        relSlideId
            ? relSlideId.insertAsSibling(newId, (typeof _positionSlide === "number") && (_positionSlide < 0))
            : this.selfElement.appendChild(newId);
        this[$slideAvalidID]++;
        parent.commit();
        return rid;
    }
}
//#endregion

//#endregion

/**
 * Class of operating the presentation part
 * @class PresentationPart
 */
export const PresentationPart = OpenXmlPart.register(class PresentationPart extends OpenXmlPurePart {
    //#region override the shemas infomation and so on
    static SchemasURI = "http://schemas.openxmlformats.org/presentationml/2006/main";
    static ContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
    //#endregion

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        readonly(this, "presentation", this.primaryElement);
        readonly(this, "slideSet", new SlideSet(this));
    }
});