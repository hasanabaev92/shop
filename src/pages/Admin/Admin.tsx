/*
  Пример использования формы с валидацией
  https://tanstack.com/form/latest/docs/framework/react/examples/simple
*/

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddProductSchema,
  type AddProductT,
} from "../../types/schemas/addProduct.schema";
import { addProductFn, getProducts } from "../../mock/fakeFetches";

function Admin() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey:["PRODUCTS"],
    queryFn: getProducts
  })

  const mutate = useMutation({
    mutationFn: async (data: AddProductT) => addProductFn(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      alert(JSON.stringify(res));
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const form = useForm({
    defaultValues: {
      name: "",
      price: 1,
      lost: 1,
    } as AddProductT,
    onSubmit: async ({ value }) => {
      console.log(value);
      await mutate.mutateAsync(value);
    },
    validators: {
      onChange: AddProductSchema,
    },
  });

  const Products = data?.map((x) => (
    <div key={x.id}>{x.name} {x.id}</div>
  ))

  return (
    <>
      <div>Админ</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            children={(field) => (
              <>
                <label>
                  Название продукта
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
                {!field.state.meta.isValid && (
                  <div>{field.state.meta.errors[0]?.message}</div>
                )}
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="price"
            children={(field) => (
              <>
                <label>
                  Цена
                  <input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    min={1}
                  />
                </label>
                {!field.state.meta.isValid && (
                  <div>{field.state.meta.errors[0]?.message}</div>
                )}
              </>
            )}
          />
        </div>

        <div>
          <form.Field
            name="lost"
            children={(field) => (
              <>
                <label>
                  Название продукта
                  <input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    min={1}
                  />
                </label>
                {!field.state.meta.isValid && (
                  <div>{field.state.meta.errors[0]?.message}</div>
                )}
              </>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button disabled={!canSubmit || isSubmitting} type="submit">
              Добавить продукт
            </button>
          )}
        />
      </form>
      {Products}
    </>
  );
}

export default Admin;
