import { UserModel } from "src/models/user.model";


@Module(
    {
        imports: [
            UserModel,
            CategoryModel,
            ProductModel,
            BrandModel
        ],
        controllers: [ProductController],
        providers: [ProductService,JwtService],
    }
)

export class ProductModule {}