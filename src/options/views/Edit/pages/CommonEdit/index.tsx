import { memo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useCurrentSite } from '../../hooks';
import { useDispatch } from 'react-redux';
import { updateSite } from '~store/site/site-slice';
import { toast } from '~hooks/use-toast';

const formSchema = z.object({
  siteName: z.string().min(1),
  siteIcon: z.string(),
  description: z.string(),
  author: z.string(),
  version: z.string(),
  flags: z.string(),
  loginUrl: z.string(),
  cookie: z.string(),
  token: z.string(),
})

const CommonEdit = memo(() => {
  const currentSite = useCurrentSite()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: '',
      siteIcon: '',
      description: '',
      author: '',
      version: '',
      flags: '',
      loginUrl: '',
      cookie: '',
      token: '',
    },
  })

  useEffect(() => {
    form.reset({
      ...currentSite.common
    })
  }, [currentSite?.id])

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (!currentSite) {
      return
    }
    dispatch(updateSite({
      id: currentSite.id,
      common: values
    }))
    console.log(123)
    toast({
      title: '保存成功',
      description: '站点信息已保存',
    })
  }, [dispatch, currentSite])

  return (
    <div className="relative h-full overflow-y-auto px-4 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点名称</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  站点规则的名称
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteIcon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点图标</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  站点规则的图标（可选）
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>站点描述</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  站点规则的描述（可选）
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>作者</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>版本号</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>额外设置</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  针对一些站点的特殊处理标记，多个标记之间用英文逗号分隔
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loginUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>登录地址</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookie</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  登录后的凭证，会被设置进请求的 Cookie header 中
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  登录后的凭证，会被设置进请求的 Authorization header 中
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">保存</Button>
        </form>
      </Form>
    </div>
  );
});

export default CommonEdit;
